import { Moment } from 'src/moments/moment.entity';
import { User } from 'src/users/user.entity';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Timestamp,
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
    pin_x: Double

    @Column({ type: 'decimal', precision: 10, scale: 7, comment: '핀 위도' })
    pin_y: Double

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt : Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date

    @DeleteDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    deletedAt: Date | null
    

    @ManyToOne(() => User, (user) => user.pins, { eager: false })
    @JoinColumn({ name: 'userIdx'})
    user: User;

    @OneToMany(() => Moment, (moment: Moment) => moment.pin, { eager: false })
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