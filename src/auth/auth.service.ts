import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createAuthorizedCode } from 'src/configs/functions/create.authorized-code';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import Redis from 'ioredis';
import { User } from 'src/users/user.entity';
const redis = new Redis();

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async createAuthorizedCode(phone: string) {
        
        const value = await createAuthorizedCode();
        await redis.set(phone, value);
        await redis.expire(phone, 120);

        return { phone, value };
    }
    
    async verifyAuthorizedCode(phone: string, value: string){
        const exist = await redis.exists(phone);
        if(!exist){
            throw new NotFoundException('인증 번호가 만료 되었습니다.');
        }
        
        const code = await redis.get(phone);
        if(value != code){
            throw new ConflictException('인증 번호가 올바르지 않습니다.');
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if(!user || (user && !compare(password, user.password))){
            throw new UnauthorizedException('요청을 처리할 수 없습니다.')
        }

        return await this.userService.findOne(user.userIdx);
    }

    async login(user: User){
        const payload = { email: user.email, sub: user.userIdx };
        return { access_token: this.jwtService.signAsync(payload) };
    }
}
