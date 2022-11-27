import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MomentsService } from '../moments/moments.service';
import { Report } from './reports.entity';
import { REASON } from '../common/constants/reports.constant';

@Injectable()
export class ReportsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly momentsService: MomentsService,
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async reportMoment(reportUserIdx: number, momentIdx: number, reason: REASON) {
    const [user, moment, checkIfReportExists] = await Promise.all([
      this.usersService.findActiveUserByUserIdx(reportUserIdx),
      this.momentsService.findActiveMomentByMomentIdx(momentIdx),
      this.reportsRepository.findOneBy({
        momentIdx,
        reportUserIdx,
      }),
    ]);

    if (checkIfReportExists) {
      throw new ConflictException('이미 신고한 모먼트입니다.');
    }
    if (moment.user_idx === reportUserIdx) {
      throw new ConflictException('자신의 모먼트는 신고할 수 없습니다.');
    }

    const receivedUserIdx = moment.user_idx;

    const report = await this.reportsRepository.create({
      reportUserIdx,
      momentIdx,
      reason,
      receivedUserIdx,
    });

    return await this.reportsRepository.save(report);
  }
}
