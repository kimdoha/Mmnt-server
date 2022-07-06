import { Pin } from 'src/pins/pin.entity';
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
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity("moments")
export class Moment {

    @PrimaryGeneratedColumn()
    momentIdx: number

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
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null

    @ManyToOne(() => Pin, (pin) => pin.moments, { eager: false })
    @JoinColumn({ name: 'pinIdx'})
    pin: Pin
    
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