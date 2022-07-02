import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(body: CreateUserDto): void;
}
