import { CACHE_MANAGER, ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createAuthorizedCode } from 'src/configs/functions/create.authorized-code';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

const QUEUE = process.env.QUEUE_NAME;

@Injectable()
export class AuthService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async createAuthorizedCode(email: string) {
        
        const value = await createAuthorizedCode();
        await this.cacheManager.set(email, value, { ttl: 300 });

        // await this.sqsService.send(QUEUE, { email, value })
        return { email, value };
    }
    
    async verifyAuthorizedCode(email: string, value: string){
        const code = await this.cacheManager.get(email);
        if(value != code){
            throw new NotFoundException('인증 번호가 올바르지 않습니다.');
        }

        return { email, value };
    }

}
