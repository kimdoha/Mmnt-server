import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
export declare class MomentsService {
    private repo;
    private pinsService;
    private usersService;
    private connection;
    constructor(repo: Repository<Moment>, pinsService: PinsService, usersService: UsersService, connection: Connection);
    createMoment(userIdx: number, body: CreateMomentDto): Promise<Moment>;
    getMomentDetailInfo(momentIdx: number): Promise<Moment>;
}
