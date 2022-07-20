import { 
    BadRequestException, 
    CACHE_MANAGER, 
    Inject, 
    Injectable, 
    NotFoundException, 
    UnauthorizedException,
    Logger,
    InternalServerErrorException,
    LoggerService,
} from '@nestjs/common';
import { 
    Connection, 
    Repository 
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';
import { createHashedPassword } from 'src/configs/functions/create.hashed-password';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';
import { MomentsService } from 'src/moments/moments.service';
import { camelCase } from "change-case";
import { Cache } from 'cache-manager';




@Injectable()
export class UsersService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Pin) private pinRepository: Repository<Pin>,
        @InjectRepository(Moment) private momentRepository: Repository<Moment>,

        private jwtService: JwtService,
        private connection: Connection,
    ) {}


    async createUser(email: string, password: string) {
        try {
            const user: User = await this.userRepository.findOneBy({ email });
            if(user){
                throw new BadRequestException('중복된 이메일입니다.');
            }
            
            const hashedPassword = await createHashedPassword(password);

            const new_user = await this.userRepository.create({ email, password: hashedPassword });

            const { userIdx } = await this.userRepository.save(new_user);
            await this.userRepository.update(userIdx, { nickname:`${userIdx}번째 익명이` } );

            return { userIdx, email };
        } catch (e) {
            // this.logger.log('log: ' + e);
            throw new InternalServerErrorException('Database Error');
        }
    }

    async signIn(email: string, password: string){
        try {
            const payload = await this.validateUser(email, password);
            return await this.login(payload);

        } catch(e) {
            throw new InternalServerErrorException('Database Error');
        }
    }

    async updateUserInfo(userIdx: number, attrs: Partial<UpdateUserInfo>) {

        const user = await this.findActiveUserByUserIdx(userIdx);
        if(attrs?.password){
            Object.assign(attrs, { password: await createHashedPassword(attrs.password) });
        }

        Object.assign(user, attrs);
        return await this.userRepository.save(user);
    }

    async updateUserLocation(userIdx: number, location: any, radius: number) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        await this.userRepository.update(userIdx, location);

        const pinLists = await this.pinRepository.createQueryBuilder()             
        .select([ 'pin_idx, pin_x, pin_y' ])
        .where(`ST_DWithin(
            ST_GeomFromText(:point, 4326),
            ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 )
            , :limit, false)`)
        .setParameters({ 
            point: `POINT(${ location.locationX } ${ location.locationY })`,
            limit: `${ radius }`
        })
        .getRawMany();

        console.log(pinLists);
        if(!pinLists.length){
            throw new NotFoundException('근처 핀을 찾을 수 없습니다.');
        }

        let pins = [], moments = [];
        pinLists.map(pin => pins.push(pin.pin_idx));

        const momentIdxLists = await this.momentRepository.createQueryBuilder('moment')
        .select([ 'MAX(moment_idx) AS moment_idx '])
        .where('moment.pin_idx in (:...pins)', { pins }) 
        .groupBy('moment.pin_idx')
        .getRawMany();

        console.log(momentIdxLists);
        await momentIdxLists.map(moment => moments.push(parseInt(moment.moment_idx)));

        console.log(moments);
        const momentLists = await this.momentRepository.createQueryBuilder('moment')
        .select([`moment_idx, moment.pin_idx, 
                title, youtube_url, music, artist,
               (ST_DistanceSphere(
                ST_GeomFromText(:point, 4326),
                ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 ) )) as distance`])
        .leftJoin(Pin, "pin", "pin.pin_idx = moment.pin_idx")
        .whereInIds(moments) 
        .orderBy('distance')
        .limit(50)
        .setParameters({ 
            point: `POINT(${ location.locationX } ${ location.locationY })`,
        })
        .getRawMany();

        return [ 
            { pinLists }, 
            { 'mainMoment': momentLists[0] ? momentLists[0] : {} }, 
            { 'momentLists': momentLists[1] ? momentLists.slice(1, momentLists.length ) : [] } 
        ];
    }
    
    

    async getDetailUserInfo(userIdx: number){
        const user = await this.userRepository.createQueryBuilder()
            .select(['user_idx, email, nickname, profile_url'])
            .where({ userIdx })
            .getRawOne();

        const moment = await this.momentRepository.createQueryBuilder()
        .select(['count(distinct pin_idx) as fin_count, count(moment_idx) as moment_count'])
        .where({ userIdx })
        .getRawOne();
        
        
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }

        let newProfileInfo = {};
        for (let prop in Object.assign(user, moment)) {
            newProfileInfo[camelCase(prop)] = user[prop];
        }

        return newProfileInfo;
    }

    async findActiveUserByUserIdx(userIdx: number){
        const user = await this.userRepository.findOneBy({ userIdx });
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }

    async findActiveUserByEmail(email: string){
        const user = await this.userRepository.findOneBy({ email });
        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }


    async validateUser(email: string, password: string){
        const user = await this.findActiveUserByEmail(email);

        if(!(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }

        return { 
            id: user.userIdx, 
            email 
        };
    }

    async login(payload): Promise<SignInResponseDto>{
       try {
            const { id, email } = payload;
            return { 
                userIdx: id, 
                accessToken: await this.jwtService.signAsync(payload) 
            };
        } catch(e) {
            throw new InternalServerErrorException('Database Error');
        }
    }

    async deleteUser(userIdx: number): Promise<any> {
        try {
            return await this.userRepository.delete({ userIdx });
        
        } catch(e) {
            throw new InternalServerErrorException('Database Error');
        }
    }
}

