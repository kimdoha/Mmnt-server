import { Connection, Repository } from 'typeorm';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { getMomentsRequestDto } from './dtos/get-moments-request.dto';
import { Report } from './report.entity';
export declare class MomentsService {
    private repo;
    private reportRepository;
    private pinsService;
    private usersService;
    private connection;
    constructor(repo: Repository<Moment>, reportRepository: Repository<Report>, pinsService: PinsService, usersService: UsersService, connection: Connection);
    createMoment(userIdx: number, body: CreateMomentDto): Promise<Moment>;
    getMyMoments(userIdx: number, query: GetHistoryRequest): Promise<any>;
    getMomentsByPin(userIdx: number, pinIdx: number, query: getMomentsRequestDto): Promise<any[]>;
    deleteMoment(userIdx: number, momentIdx: number, type: string): Promise<import("typeorm").DeleteResult>;
    reportMoment(userIdx: number, momentIdx: number, reason: string): Promise<Report>;
    findActiveMomentByMomentIdx(momentIdx: number): Promise<any>;
    deletePin(pinIdx: number, userIdx: number): Promise<void>;
    getMomentCountAboutPin(pinIdx: number): Promise<[Moment[], number]>;
    deleteUserInfo(userIdx: number): Promise<void>;
}
