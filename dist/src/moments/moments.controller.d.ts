import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { MomentsService } from './moments.service';
export declare class MomentsController {
    private momentsService;
    constructor(momentsService: MomentsService);
    createMoment(user: any, body: CreateMomentDto, res: any): Promise<any>;
    getMyMomentHistory(user: any, query: GetHistoryRequest, res: any): Promise<any>;
    deleteMoment(user: any, momentIdx: number, res: any): Promise<any>;
    deleteUserInfo(user: any, res: any): Promise<any>;
}
