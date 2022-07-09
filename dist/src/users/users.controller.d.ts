import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
import { GetProfileInfoResponse } from 'src/common/responses/users/get.profile-Info.response.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signup(body: CreateUserDto, res: any): Promise<any>;
    signin(body: CreateUserDto, res: any): Promise<any>;
    findProfileInfo(user: any, res: any): Promise<GetProfileInfoResponse>;
    updateUserLocation(user: any, body: UpdateLocationDto, res: any): Promise<any>;
}
