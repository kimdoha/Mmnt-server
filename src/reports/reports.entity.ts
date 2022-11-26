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

@Entity('mmnt.reports')
export class Report extends BaseTimeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '신고 아이디',
  })
  reportIdx: number;

  @Column({ type: 'varchar', length: 200, comment: '신고 이유' })
  reason: string;

  // @ManyToOne(() => Moment, (moment) => moment.reports, { eager: false })
  // @JoinColumn({ name: 'moment_idx' })
  // momentIdx: number;

  // @ManyToOne(() => User, (user) => user.reports, { eager: false })
  // @JoinColumn({ name: 'user_idx' })
  // userIdx: number;

  // @ManyToOne(() => User, (user) => user.reports, { eager: false })
  // @JoinColumn({ name: 'received_user_idx' })
  // receivedUserIdx: number;
}
