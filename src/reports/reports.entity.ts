import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Moment } from '../moments/moment.entity';
import { BaseTimeEntity } from "../common/BaseTimeEntity";
import { REASON } from "../common/constants/reports.constant";

@Entity('mmnt.reports')
export class Report extends BaseTimeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '신고 아이디',
  })
  reportIdx: number;

  @Column({
    type: 'enum',
    enum: REASON,
    comment: '신고 이유',
    default: REASON.SPAM,
  })
  reason: REASON;

  @ManyToOne(() => Moment, (moment) => moment.reports, { eager: false })
  @JoinColumn({ name: 'moment_idx' })
  momentIdx: number;

  @ManyToOne(() => User, (user) => user.reports, { eager: false })
  @JoinColumn({ name: 'report_user_idx' })
  reportUserIdx: number;

  @ManyToOne(() => User, (user) => user.reports, { eager: false })
  @JoinColumn({ name: 'received_user_idx' })
  receivedUserIdx: number;
}
