import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { FindAuthorizedUserDto } from '../auth/dtos/find-authorized-user.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    certificateUser(body: CreateUserDto, res: any): Promise<any>;
    validate(query: FindAuthorizedUserDto, res: any): Promise<any>;
    createUser(body: CreateUserDto): void;
    findUser(userIdx: string): Promise<void>;
}
