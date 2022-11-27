import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Page } from 'src/helpers/page/page';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { getMomentsRequestDto } from './dtos/get-moments-request.dto';

@Injectable()
export class MomentsService {
  constructor(
    @InjectRepository(Moment) private repo: Repository<Moment>,
    private pinsService: PinsService,
    private usersService: UsersService,
    private connection: Connection,
  ) {}

  async createMoment(userIdx: number, body: CreateMomentDto) {
    const { pinX, pinY, ...momentInfo } = body;
    const user = await this.usersService.findActiveUserByUserIdx(userIdx);

    // const reportCount = await this.reportRepository.countBy({ receivedUserIdx: userIdx });
    // console.log(reportCount);

    // if(reportCount >= 3) {
    //     throw new UnauthorizedException('접근 권한이 없습니다.');
    // }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { pinIdx } = await this.pinsService.createPin(userIdx, pinX, pinY);
      const moment = await this.repo.create({ userIdx, pinIdx, ...momentInfo });
      return await this.repo.save(moment);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(e.response?.message);
    } finally {
      await queryRunner.release();
    }
  }

  async getMyMoments(userIdx: number, query: GetHistoryRequest) {
    const user = await this.usersService.findActiveUserByUserIdx(userIdx);
    let moments;

    const limit = Page.getLimit(query.limit);
    const offset = Page.getOffset(query.page, query.limit);

    if (query.type === 'main') {
      moments = await this.repo
        .createQueryBuilder('users')
        .select([
          'users.moment_idx, users.title, users.image_url, users.updated_at, pin_x, pin_y',
        ])
        .where('user_idx= :id', { id: userIdx })
        .leftJoin(Pin, 'pin', 'pin.pin_idx = users.pin_idx')
        .orderBy('moment_idx', 'DESC')
        .limit(limit)
        .offset(offset)
        .getRawMany();
    } else if (query.type === 'detail') {
      moments = await this.repo
        .createQueryBuilder('moment')
        .select([
          'moment_idx, title, description, image_url, youtube_url, music, artist, moment.updated_at, pin_x, pin_y',
        ])
        .addSelect((sq) => {
          return sq
            .select(['nickname'])
            .from(User, 'user')
            .where('user_idx= :id', { id: userIdx });
        })
        .where('user_idx= :id', { id: userIdx })
        .leftJoin(Pin, 'pin', 'pin.pin_idx = moment.pin_idx')
        .orderBy('moment_idx', 'DESC')
        .limit(limit)
        .offset(offset)
        .getRawMany();
    }

    if (!moments) {
      throw new NotFoundException('등록된 모먼트가 없습니다.');
    }
    return moments;
  }

  async getMomentsByPin(
    userIdx: number,
    pinIdx: number,
    query: getMomentsRequestDto,
  ) {
    await this.usersService.findActiveUserByUserIdx(userIdx);
    await this.pinsService.findActivePinByPinIdx(pinIdx);

    const limit = Page.getLimit(query.limit);
    const offset = Page.getOffset(query.page, query.limit);

    const moments = await this.repo
      .createQueryBuilder()
      .where('pin_idx = :id', { id: pinIdx })
      .orderBy('moment_idx', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany();

    return moments;
  }

  async deleteMoment(userIdx: number, momentIdx: number, type: string) {
    if (type === 'moment') {
      const user = await this.usersService.findActiveUserByUserIdx(userIdx);
      const moment = await this.repo.findOneBy({ momentIdx, userIdx });
      if (!moment) {
        throw new NotFoundException(
          '해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.',
        );
      }

      return await this.repo.delete(momentIdx);
    }
    if (type === 'user') {
      return await this.repo.delete({ userIdx });
    }
    throw new BadRequestException('삭제 경로가 올바르지 않습니다.');
  }

  async findActiveMomentByMomentIdx(momentIdx: number) {
    const moment = await this.repo
      .createQueryBuilder('moment')
      .select(['moment.moment_idx, moment.user_idx'])
      .whereInIds(momentIdx)
      .getRawOne();
    console.log(moment);

    if (!moment) {
      throw new NotFoundException('해당 모먼트는 삭제 되었습니다.');
    }

    return moment;
  }

  // 추후에 스케줄러
  async deletePin(pinIdx: number, userIdx: number) {
    const exist = await this.getMomentCountAboutPin(pinIdx);
    if (exist) {
      throw new BadRequestException('해당 핀은 삭제할 수 없습니다.');
    } else await this.pinsService.deletePin(pinIdx);
  }

  async getMomentCountAboutPin(pinIdx: number) {
    const count = await this.repo.findAndCountBy({ pinIdx });
    console.log(count);

    return count;
  }

  async deleteUserInfo(userIdx: number) {
    const user = await this.usersService.findActiveUserByUserIdx(userIdx);

    await this.deleteMoment(userIdx, 0, 'user');
    await this.usersService.deleteUser(userIdx);
  }
}
