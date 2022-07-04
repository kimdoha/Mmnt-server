import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signup(body: CreateUserDto, res: any): Promise<any>;
    findUser(userIdx: string): Promise<void>;
}
