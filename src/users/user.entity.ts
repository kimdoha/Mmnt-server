import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
    Timestamp,
    Double
} from 'typeorm';

import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';

@Entity("mmnt.users")
export class User {

    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "유저 아이디" })
    userIdx: number
    
    @Column({ type: 'varchar', length: 50, comment: '유저 이메일' })
    email: string

    @Column({ type: 'varchar', length: 500, comment: '유저 비밀번호' })
    password: any

    @Column({ type: 'varchar', length: 45, comment: '유저 닉네임' })
    nickname: string

    @Column({ type: 'text', nullable: true, comment: '유저 프로필 이미지' })
    profileUrl: string

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true, comment: '유저 경도' })
    locationX: number

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true, comment: '유저 위도' })
    locationY: number

    @Column({ type: 'char', length: 1, default: 0, comment: '소셜 로그인'})
    snsRoute: string

    @Column({ type: 'char', length: 1, default: 'Y', comment: '알림 여부'})
    alarm: string


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt : Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @DeleteDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    deletedAt: Date | null

    @OneToMany(type => Pin, (pin: Pin) => pin.userIdx, { eager: false })
    pins: Pin[];


    @OneToMany(type => Moment, (moment: Moment) => moment.userIdx, { eager: false })
    moments: Moment[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.userIdx);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.userIdx);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.userIdx);
    }
}