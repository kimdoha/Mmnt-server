import { Cipher } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("moments")
export class Moment {

    @PrimaryGeneratedColumn()
    momentIdx: number

    @Column("bigint")
    pinIdx: number

    @Column("varchar")
    title: string

    @Column("tinytext")
    description: string

    @Column("text")
    imageUrl: string

    @Column("text")
    youtubeUrl: string

    @Column("varchar")
    music: string

    @Column("varchar")
    artist: string

}