import { Pin } from 'src/pins/pin.entity';
export declare class Moment {
    momentIdx: number;
    title: string;
    description: string;
    imageUrl: string;
    youtubeUrl: string;
    music: string;
    artist: string;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    pin: Pin;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
