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
        userIdx: number;
        accessToken: string;
    }>;
    findOne(userIdx: number): Promise<User>;
    findOneByEmail(email: string): Promise<any>;
    update(userIdx: number, attrs: Partial<User>): Promise<User>;
    remove(userIdx: number): Promise<User>;
}
