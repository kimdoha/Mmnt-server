import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Pin } from './pin.entity';
export declare class PinsService {
    private repo;
    private usersService;
    constructor(repo: Repository<Pin>, usersService: UsersService);
    createPin(userIdx: number, pin_x: number, pin_y: number): Promise<Pin>;
}
