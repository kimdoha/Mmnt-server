import { Moment } from 'src/moments/moment.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BaseTimeEntity } from '../common/BaseTimeEntity';

@Entity('mmnt.pins')
export class Pin extends BaseTimeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
    comment: '핀 아이디',
  })
  pinIdx: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, comment: '핀 경도' })
  pinX: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, comment: '핀 위도' })
  pinY: number;

  @OneToMany((type) => Moment, (moment: Moment) => moment.pinIdx, {
    eager: false,
  })
  moments: Moment[];
}
