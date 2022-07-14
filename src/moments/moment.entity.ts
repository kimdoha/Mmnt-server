import { Pin } from 'src/pins/pin.entity';
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
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity("mmnt.moments")
export class Moment {

    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true, comment: "모먼트 아이디" })
    momentIdx: number

    @Column({ type: 'varchar', length: 100, comment: '모먼트 제목'})
    title: string

    @Column({ type: 'varchar', length: 60, comment: '상세 설명'})
    description: string

    @Column({ type: 'text', comment: '모먼트 이미지'})
    imageUrl: string

    @Column({ type: 'text', comment: '유튜브 링크'})
    youtubeUrl: string

    @Column({ type: 'varchar', length: 200, comment: '곡 제목'})
    music: string

    @Column({ type: 'varchar', length: 100, comment: '아티스트'})
    artist: string

    @Column({ type: 'char', length: 1, default: 'N', comment: '삭제 여부'})
    isDeleted: string

    @CreateDateColumn({ type: "timestamp", default: "CURRENT_TIMESTAMP" })
    createdAt : Date

    @UpdateDateColumn({ type: "timestamp", nullable: true, default: "CURRENT_TIMESTAMP" })
    updatedAt: Date | null

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deletedAt: Date | null


    @ManyToOne(type => Pin, pin => pin.moments, { eager: false })
    @JoinColumn({ name: 'pin_idx'})
    pinIdx: number
    
    @ManyToOne(type => User, user => user.moments, { eager: false })
    @JoinColumn({ name: 'user_idx'})
    userIdx: number

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.momentIdx);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.momentIdx);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.momentIdx);
    }
}