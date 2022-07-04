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

    

    async createUser(email: string, password: string) {
        try {
            // email 중복 여부
            if(await this.findOneByEmail(email)){
                const result = await this.findOneByEmail(email);
                console.log(result);
            }
            const user = await this.repo.create({ email, password });
            //  기존의 user 가 존재한다면
            const { userIdx } = await this.repo.save(user);

            return { userIdx };
        } catch (e) {
            throw new ConflictException(e.message);
        }
    }

    async findOne(userIdx: number){
        return await this.repo.findOneBy({ userIdx });
    }

    async findOneByEmail(email: string){
        return await this.repo.findOneBy({ email });
    }

    async update(userIdx: number, attrs: Partial<User>){
        const user = await this.findOne(userIdx);
        if(!user){
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(userIdx: number){
        const user = await this.findOne(userIdx);
        if(!user){
            throw new NotFoundException('user not found');
        }

        return this.repo.remove(user);
    }

}

