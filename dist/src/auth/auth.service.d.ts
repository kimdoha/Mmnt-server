import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    createAuthorizedCode(email: string): Promise<{
        email: string;
        value: string;
    }>;
    verifyAuthorizedCode(email: string, value: string): Promise<void>;
    login(user: User): Promise<{
        access_token: Promise<string>;
    }>;
}
