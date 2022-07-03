import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove
} from 'typeorm';

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    userIdx: number
    
    @Column("varchar")
    phone: string

    @Column("varchar")
    password: string

    @Column("varchar")
    nickname: string

    @Column("text")
    profileImgUrl: string

    @Column("decimal")
    location_x: number

    @Column("decimal")
    location_y: number

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