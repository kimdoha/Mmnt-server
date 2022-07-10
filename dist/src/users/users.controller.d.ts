import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
import { UpdateLocationDto } from './dtos/update-location.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signup(body: CreateUserDto, res: any): Promise<any>;
    signin(body: CreateUserDto, res: any): Promise<any>;
    findProfileInfo(user: any, res: any): Promise<any>;
    updateUserLocation(user: any, body: UpdateLocationDto, res: any): Promise<any>;
}
