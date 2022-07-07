import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createAuthorizedCode } from 'src/configs/functions/create.authorized-code';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import Redis from 'ioredis';
const redis = new Redis();

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async createAuthorizedCode(email: string) {
        
        const value = await createAuthorizedCode();
        await redis.set(email, value);
        await redis.expire(email, 300);

        return { email, value };
    }
    
    async verifyAuthorizedCode(email: string, value: string){
        const exist = await redis.exists(email);
        if(!exist){
            throw new NotFoundException('인증 번호가 만료 되었습니다.');
        }
        
        const code = await redis.get(email);
        if(value != code){
            throw new ConflictException('인증 번호가 올바르지 않습니다.');
        }
    }

}
