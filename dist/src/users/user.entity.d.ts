import { Moment } from 'src/moments/moment.entity';
import { BaseTimeEntity } from '../common/BaseTimeEntity';
export declare class User extends BaseTimeEntity {
    userIdx: number;
    email: string;
    password: string | any;
    nickname: string;
    profileUrl: string;
    locationX: number;
    locationY: number;
    snsRoute: string;
    alarm: string;
    moments: Moment[];
}
