import { Timestamp } from 'typeorm';
export declare class Moment {
    momentIdx: number;
    pinIdx: number;
    title: string;
    description: string;
    imageUrl: string;
    youtubeUrl: string;
    music: string;
    artist: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
