import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { createAuthorizedCode } from 'src/configs/function';
import Redis from 'ioredis';
const redis = new Redis();

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

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

    async create(phone: string, password: string) {

        const user = this.repo.create({ phone, password });
        return this.repo.save(user);
    }

    findOne(userIdx: string){
        return this.repo.findOneBy({ userIdx });
    }

    async update(userIdx: string, attrs: Partial<User>){
        const user = await this.findOne(userIdx);
        if(!user){
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(userIdx: string){
        const user = await this.findOne(userIdx);
        if(!user){
            throw new NotFoundException('user not found');
        }

        return this.repo.remove(user);
    }

}

