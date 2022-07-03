import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove
} from 'typeorm';

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