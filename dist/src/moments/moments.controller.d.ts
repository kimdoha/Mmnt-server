import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { getMomentsRequestDto } from './dtos/get-moments-request.dto';
import { MomentsService } from './moments.service';
export declare class MomentsController {
    private momentsService;
    constructor(momentsService: MomentsService);
    createMoment(user: any, body: CreateMomentDto, res: any): Promise<any>;
    getMyMomentHistory(user: any, query: GetHistoryRequest, res: any): Promise<any>;
    getMoments(user: any, res: any, pinIdx: number, query: getMomentsRequestDto): Promise<any>;
    deleteMoment(user: any, momentIdx: number, res: any): Promise<any>;
    deleteUserInfo(user: any, res: any): Promise<any>;
}
