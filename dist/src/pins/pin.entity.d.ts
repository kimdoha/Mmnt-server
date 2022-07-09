import { Moment } from 'src/moments/moment.entity';
export declare class Pin {
    pinIdx: number;
    pin_x: number;
    pin_y: number;
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
