import { Double } from 'typeorm';
import { Pin } from 'src/pins/pin.entity';
export declare class User {
    userIdx: number;
    email: string;
    password: string;
    nickname: string;
    profileImgUrl: string;
    location_x: Double;
    location_y: Double;
    snsRoute: string;
    alarm: string;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    pins: Pin[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
