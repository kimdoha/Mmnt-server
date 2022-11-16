import { User } from 'src/users/user.entity';
import { Moment } from './moment.entity';

import {
  AfterInsert,
  AfterRemove,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('mmnt.reports')
export class Report {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '신고 아이디',
  })
  reportIdx: number;

  @Column({ type: 'varchar', length: 200, comment: '신고 이유' })
  reason: string;

  @Column({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne((type) => Moment, (moment) => moment.reports, { eager: false })
  @JoinColumn({ name: 'moment_idx' })
  momentIdx: number;

  @ManyToOne((type) => User, (user) => user.reports, { eager: false })
  @JoinColumn({ name: 'user_idx' })
  userIdx: number;

  @ManyToOne((type) => User, (user) => user.reports, { eager: false })
  @JoinColumn({ name: 'received_user_idx' })
  receivedUserIdx: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Report with id', this.reportIdx);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Report with id', this.reportIdx);
  }
}
