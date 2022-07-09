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
    OneToMany
} from 'typeorm';

@Entity("pins")
export class Pin {

    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "핀 아이디" })
    pinIdx: number

    @Column({ type: 'decimal', precision: 10, scale: 7, comment: '핀 경도' })
    pin_x: number

    @Column({ type: 'decimal', precision: 10, scale: 7, comment: '핀 위도' })
    pin_y: number

    @Column({ type: 'char', length: 1, default: 'N', comment: '삭제 여부'})
    isDeleted: string

    @CreateDateColumn({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
    createdAt : Date

    @UpdateDateColumn({ type: "timestamp", nullable: true, default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" })
    updatedAt: Date | null

    @DeleteDateColumn({ type: "timestamp", nullable: true, })
    deletedAt: Date | null
    

    @ManyToOne(type => User, user => user.pins, { eager: false })
    @JoinColumn({ name: 'userIdx'})
    userIdx: number;

    @OneToMany(type => Moment, (moment: Moment) => moment.pin, { eager: false })
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