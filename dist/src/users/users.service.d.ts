import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    createUser(email: string, password: string): Promise<{
        userIdx: number;
        email: string;
    }>;
    signIn(email: string, password: string): Promise<{
        userIdx: any;
        accessToken: string;
    }>;
    findUserByEmail(email: string): Promise<User>;
    findUserByUserIdx(userIdx: number): Promise<any>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        email: string;
    }>;
    login(payload: any): Promise<{
        userIdx: any;
        accessToken: string;
    }>;
}
