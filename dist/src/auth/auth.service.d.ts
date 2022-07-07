import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    createAuthorizedCode(email: string): Promise<{
        email: string;
        value: string;
    }>;
    verifyAuthorizedCode(email: string, value: string): Promise<void>;
}
