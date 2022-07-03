import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    AfterInsert, 
    AfterUpdate, 
    AfterRemove 
} from 'typeorm';

@Entity("moments")
export class Moment {

    @PrimaryGeneratedColumn()
    momentIdx: number

    @Column("bigint")
    pinIdx: number

    @Column("varchar")
    title: string

    @Column("text")
    description: string

    @Column("text")
    imageUrl: string

    @Column("text")
    youtubeUrl: string

    @Column("varchar")
    music: string

    @Column("varchar")
    artist: string

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