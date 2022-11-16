import { Moment } from 'src/moments/moment.entity';
import { User } from 'src/users/user.entity';
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
  ManyToOne,
  Double,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('mmnt.pins')
export class Pin {
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

  @CreateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @OneToMany((type) => Moment, (moment: Moment) => moment.pinIdx, {
    eager: false,
  })
  moments: Moment[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.pinIdx);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.pinIdx);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.pinIdx);
  }
}
