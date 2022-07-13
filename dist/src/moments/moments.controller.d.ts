import { CreateMomentDto } from './dtos/create-moment.dto';
import { MomentsService } from './moments.service';
export declare class MomentsController {
    private momentsService;
    constructor(momentsService: MomentsService);
    createMoment(user: any, body: CreateMomentDto, res: any): Promise<any>;
    getMyMomentFeeds(user: any, type: string, res: any): Promise<any>;
}
