import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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

    
}