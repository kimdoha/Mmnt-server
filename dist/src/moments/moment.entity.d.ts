import { Report } from './report.entity';
export declare class Moment {
    momentIdx: number;
    title: string;
    description: string;
    imageUrl: string;
    youtubeUrl: string;
    music: string;
    artist: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    pinIdx: number;
    userIdx: number;
    reports: Report[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
