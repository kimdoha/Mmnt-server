import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';
import { createHashedPassword } from 'src/configs/functions/create.hashed-password';
import { camelCase } from 'change-case';
import { Cache } from 'cache-manager';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';
import { User } from './user.entity';
import { MmntLoger } from 'src/common/logger/logger';

@Injectable()
export class UsersService {
  private readonly logger = new MmntLoger(UsersService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Pin) private pinRepository: Repository<Pin>,
    @InjectRepository(Moment) private momentRepository: Repository<Moment>,

    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  async createUser(email: string, password: string) {
    const user: User = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException('중복된 이메일입니다.');
    }

    const hashedPassword: string = await createHashedPassword(password);
    const index: number = await this.userRepository.count() + 1;

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword,
      nickname: `${index}번째 익명이`,
    });

    const { userIdx } = await this.userRepository.save(newUser);

    return { userIdx, email };
  }

  async signIn(email: string, password: string) {
    const payload = await this.validateUser(email, password);
    return await this.login(payload);
  }

  async updateUserInfo(userIdx: number, attrs: Partial<UpdateUserInfo>) {
    const user = await this.findActiveUserByUserIdx(userIdx);
    if (attrs?.password) {
      Object.assign(attrs, {
        password: await createHashedPassword(attrs.password),
      });
    }

    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  async updateUserLocation(
    userIdx: number, 
    latitude: number,
    longitude: number,
    radius: number
  ) {
    const user = await this.findActiveUserByUserIdx(userIdx);
    const cacheResponse = await this.cacheManager.get(userIdx.toString());

    if(cacheResponse!!) {
      this.logger.debug('cache response exist');
      return cacheResponse;
    } else {
      this.logger.debug('cache response does not exist');
      await this.userRepository.update(userIdx, 
        {
          locationX: longitude,
          locationY: latitude,
        });
  
      const pinLists = await this.pinRepository
      .createQueryBuilder()
      .select(['pin_idx, pin_x, pin_y'])
      .where(
        `ST_DWithin(
            ST_GeomFromText(:point, 4326),
            ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 )
            , :limit, false)`,
      )
      .setParameters({
        point: `POINT(${longitude} ${latitude})`,
        limit: `${radius}`,
      })
      .getRawMany();
  
  
      const pins = [];
      const moments = [];
      pinLists.map((pin) => pins.push(pin.pin_idx));
  
      const latestMomentIdxLists = pins.length
        ? await this.momentRepository
            .createQueryBuilder('moment')
            .select(['MAX(moment_idx) AS moment_idx '])
            .where('moment.pin_idx in (:...pins)', { pins })
            .groupBy('moment.pin_idx')
            .getRawMany()
        : [];
  
      latestMomentIdxLists.map((moment) =>
        moments.push(parseInt(moment.moment_idx)),
      );

      const momentLists = moments.length
        ? await this.momentRepository
            .createQueryBuilder('moment')
            .select([
              `moment_idx, moment.pin_idx, 
                  title, youtube_url, music, artist, 
                  pin_x, pin_y,
                 (ST_DistanceSphere(
                  ST_GeomFromText(:point, 4326),
                  ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 ) )) as distance`,
            ])
            .leftJoin(Pin, 'pin', 'pin.pin_idx = moment.pin_idx')
            .whereInIds(moments)
            .orderBy('distance')
            .limit(50)
            .setParameters({
              point: `POINT(${longitude} ${latitude})`,
            })
            .getRawMany()
        : [];
  
      const momentCount = pins.length
        ? await this.momentRepository
            .createQueryBuilder('moment')
            .select([`count('moment_idx') as momentcount, pin_idx`])
            .where('moment.pin_idx in (:...pins)', { pins })
            .groupBy('moment.pin_idx')
            .getRawMany()
        : [];
  

      momentLists.map((moment) => {
        const count = momentCount.find(
          (count) => count.pin_idx === moment.pin_idx,
        ).momentcount;
        moment.momentCount = count || 0;
      });
  
  
      const response = [
        { pinLists },
        { mainPin: momentLists[0] ? momentLists[0] : {} },
        {
          nearByPinLists: momentLists[1]
            ? momentLists.slice(1, momentLists.length)
            : [],
        },
      ];

      await this.cacheManager.set(userIdx.toString(), response, {ttl: 300});
      return response;
    }
  }

  async getDetailUserInfo(userIdx: number) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select(['user_idx, email, nickname, profile_url'])
      .where({ userIdx })
      .getRawOne();

    const moment = await this.momentRepository
      .createQueryBuilder()
      .select([
        'count(distinct pin_idx) as fin_count, count(moment_idx) as moment_count',
      ])
      .where({ userIdx })
      .getRawOne();

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    const newProfileInfo = {};
    for (const prop in Object.assign(user, moment)) {
      newProfileInfo[camelCase(prop)] = user[prop];
    }

    return newProfileInfo;
  }

  async findActiveUserByUserIdx(userIdx: number) {
    const user = await this.userRepository.findOneBy({ userIdx });
    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    return user;
  }

  async findActiveUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findActiveUserByEmail(email);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('유저 정보가 올바르지 않습니다.');
    }

    return {
      id: user.userIdx,
      email,
    };
  }

  async login(payload): Promise<SignInResponseDto> {
    try {
      const { id, email } = payload;
      return {
        userIdx: id,
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new InternalServerErrorException('Database Error');
    }
  }

  async deleteUser(userIdx: number): Promise<any> {
    try {
      return await this.userRepository.delete({ userIdx });
    } catch (e) {
      throw new InternalServerErrorException('Database Error');
    }
  }
}
