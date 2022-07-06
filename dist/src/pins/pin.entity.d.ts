import { Moment } from 'src/moments/moment.entity';
import { User } from 'src/users/user.entity';
import { Double } from 'typeorm';
export declare class Pin {
    pinIdx: number;
    pin_x: Double;
    pin_y: Double;
    isDeleted: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    user: User;
    moments: Moment[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
