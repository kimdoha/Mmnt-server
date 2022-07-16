import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Pin } from './pin.entity';
import { Cache } from 'cache-manager';
export declare class PinsService {
    private cacheManager;
    private repo;
    private usersService;
    constructor(cacheManager: Cache, repo: Repository<Pin>, usersService: UsersService);
    createPin(userIdx: number, pinX: number, pinY: number): Promise<Pin>;
    getPinLists(locationX: number, locationY: number): Promise<any>;
    findActivePinByPinIdx(pinIdx: number): Promise<Pin>;
    deletePin(pinIdx: number): Promise<import("typeorm").DeleteResult>;
}
