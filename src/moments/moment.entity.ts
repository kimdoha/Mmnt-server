import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    AfterInsert, 
    AfterUpdate, 
    AfterRemove,
    CreateDateColumn,
    DeleteDateColumn,
    Timestamp,
    UpdateDateColumn,
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

    @CreateDateColumn()
    createdAt : Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @DeleteDateColumn()
    deletedAt: Timestamp
    
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