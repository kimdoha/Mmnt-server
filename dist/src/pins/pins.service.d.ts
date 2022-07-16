import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Pin } from './pin.entity';
export declare class PinsService {
    private repo;
    private usersService;
    constructor(repo: Repository<Pin>, usersService: UsersService);
    createPin(userIdx: number, pinX: number, pinY: number): Promise<Pin>;
    getPinInfo(userIdx: number, pinIdx: number, distance: number): Promise<void>;
    findActivePinByPinIdx(pinIdx: number): Promise<Pin>;
    deletePin(pinIdx: number, userIdx: number, type: string): Promise<void>;
}
