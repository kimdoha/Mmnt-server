import { Double } from 'typeorm';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';
export declare class User {
    userIdx: number;
    email: string;
    password: string;
    nickname: string;
    profileUrl: string;
    locationX: Double;
    locationY: Double;
    snsRoute: string;
    alarm: string;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    pins: Pin[];
    moments: Moment[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
