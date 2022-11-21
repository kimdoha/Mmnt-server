import { UpdateLocationDto } from './dtos/update-location.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signup(body: CreateUserDto, res: any): Promise<any>;
    signin(body: CreateUserDto, res: any): Promise<any>;
    updateUserInfo(user: any, body: UpdateUserInfo, res: any): Promise<any>;
    findProfileInfo(user: any, res: any): Promise<any>;
    updateUserLocation(user: any, body: UpdateLocationDto, res: any): Promise<any>;
}
