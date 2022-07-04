import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    createUser(email: string, password: string): Promise<{
        userIdx: number;
    }>;
    findOne(userIdx: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(userIdx: number, attrs: Partial<User>): Promise<User>;
    remove(userIdx: number): Promise<User>;
}
