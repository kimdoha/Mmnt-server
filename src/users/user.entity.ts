import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryColumn
} from 'typeorm';

@Entity("users")
export class User {

    // @PrimaryColumn({ type: 'bigint', comment: '유저 인덱스'})
    @PrimaryGeneratedColumn({ type: "integer", unsigned: true, comment: "유저 인덱스" })
    userIdx: number
    
    @Column({ type: 'varchar', length: 20, comment: '유저 이메일' })
    email: string

    @Column({ type: 'varchar', length: 250, comment: '유저 비밀번호' })
    password: string

    @Column({ type: 'varchar', length: 45, nullable: true, comment: '유저 닉네임' })
    nickname: string

    @Column({ type: 'text', nullable: true, comment: '유저 프로필 이미지' })
    profileImgUrl: string

    @Column({ type: 'decimal', nullable: true, comment: '유저 경도' })
    location_x: number

    @Column({ type: 'decimal', nullable: true, comment: '유저 위도' })
    location_y: number

    @Column({ type: 'character', length: 1, default: 0, comment: '소셜 로그인'})
    snsRoute: string

    @Column({ type: 'character', length: 1, default: 'Y', comment: '알림 여부'})
    alarm: string

    @Column({ type: 'character', length: 1, default: 'N', comment: '삭제 여부'})
    isDeleted: string


    @CreateDateColumn()
    createdAt : Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @DeleteDateColumn()
    deletedAt: Timestamp

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