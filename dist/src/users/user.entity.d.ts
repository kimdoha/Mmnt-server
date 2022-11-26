import { Moment } from 'src/moments/moment.entity';
export declare class User {
    userIdx: number;
    email: string;
    password: string | any;
    nickname: string;
    profileUrl: string;
    locationX: number;
    locationY: number;
    snsRoute: string;
    alarm: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    moments: Moment[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
