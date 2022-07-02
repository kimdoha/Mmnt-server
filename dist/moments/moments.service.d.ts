import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
export declare class MomentsService {
    private pinsService;
    private usersService;
    constructor(pinsService: PinsService, usersService: UsersService);
}
