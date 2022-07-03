import { Timestamp } from 'typeorm';
export declare class Pin {
    pinIdx: number;
    userIdx: number;
    pin_x: number;
    pin_y: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
