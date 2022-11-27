import { Moment } from 'src/moments/moment.entity';
import { BaseTimeEntity } from '../common/BaseTimeEntity';
export declare class Pin extends BaseTimeEntity {
    pinIdx: number;
    pinX: number;
    pinY: number;
    moments: Moment[];
}
