import { BaseTimeEntity } from '../common/BaseTimeEntity';
import { Report } from '../reports/reports.entity';
export declare class Moment extends BaseTimeEntity {
    momentIdx: number;
    title: string;
    description: string;
    imageUrl: string;
    youtubeUrl: string;
    music: string;
    artist: string;
    pinIdx: number;
    userIdx: number;
    reports: Report[];
}
