import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { SqsService } from '@ssut/nestjs-sqs';
export declare class AuthService {
    private cacheManager;
    private userService;
    private jwtService;
    private sqsService;
    constructor(cacheManager: Cache, userService: UsersService, jwtService: JwtService, sqsService: SqsService);
    createAuthorizedCode(email: string): Promise<{
        email: string;
        value: string;
    }>;
    verifyAuthorizedCode(email: string, value: string): Promise<{
        email: string;
        value: string;
    }>;
}
