import { Moment } from 'src/moments/moment.entity';
export declare class Pin {
    pinIdx: number;
    pinX: number;
    pinY: number;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    userIdx: number;
    moments: Moment[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
