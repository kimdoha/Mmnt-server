import { Moment } from 'src/moments/moment.entity';
export declare class Pin {
    pinIdx: number;
    pinX: number;
    pinY: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    moments: Moment[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
