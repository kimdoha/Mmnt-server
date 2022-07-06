import { AuthService } from './auth.service';
import { CreateAuthorizedCodeDto } from 'src/auth/dtos/create.authorized-code.dto';
import { FindAuthorizedUserDto } from './dtos/find.authorized-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    certificateUser(body: CreateAuthorizedCodeDto, res: any): Promise<any>;
    validate(query: FindAuthorizedUserDto, res: any): Promise<any>;
}
