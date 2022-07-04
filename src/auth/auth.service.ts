import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { createAuthorizedCode } from 'src/configs/function';
import Redis from 'ioredis';
const redis = new Redis();

@Injectable()
export class AuthService {
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

}
