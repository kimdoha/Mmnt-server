import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("pins")
export class Pin {

    @PrimaryGeneratedColumn()
    pinIdx: number
    
    @Column("bigint")
    userIdx: number

    @Column("decimal")
    pin_x: number

    @Column("decimal")
    pin_y: number

}