import { Timestamp } from 'typeorm';
export declare class User {
    userIdx: number;
    email: string;
    password: string;
    nickname: string;
    profileImgUrl: string;
    location_x: number;
    location_y: number;
    snsRoute: string;
    alarm: string;
    isDeleted: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
