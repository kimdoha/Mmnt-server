import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private repo;
    constructor(repo: Repository<User>);
    validate(email: string): Promise<User>;
}
export {};
