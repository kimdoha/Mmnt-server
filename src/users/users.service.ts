import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import Redis from 'ioredis';
import { createCertificateCode } from 'src/configs/function';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async createCode(phone: string) {
        const redis = new Redis();
        const code = await createCertificateCode();
        await redis.set(phone, code);
        await redis.expire(phone, 120);
        const value = await redis.get(phone);

        return { phone, value };
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

