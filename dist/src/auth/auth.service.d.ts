import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
export declare class AuthService {
    private cacheManager;
    private userService;
    private jwtService;
    constructor(cacheManager: Cache, userService: UsersService, jwtService: JwtService);
    createAuthorizedCode(email: string): Promise<{
        email: string;
        value: string;
    }>;
    verifyAuthorizedCode(email: string, value: string): Promise<{
        email: string;
        value: string;
    }>;
}
