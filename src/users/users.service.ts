import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { createHashedPassword } from 'src/configs/functions/create.hashed-password';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,

    ) {}

    
    async createUser(email: string, password: string) {

        const user: User = await this.findOneByEmail(email);
        if(user){
            throw new BadRequestException('중복된 이메일입니다.');
        }
        
        const hashedPassword = await createHashedPassword(password)
        const new_user = await this.repo.create({ email, password: hashedPassword });


        const { userIdx } = await this.repo.save(new_user);
        await this.repo.update(userIdx, { nickname:`${userIdx}번째 익명이` } );

        return { userIdx, email };

    }

    async signIn(email: string, password: string){
        const user: User = await this.findOneByEmail(email);
        const hashedPassword = await createHashedPassword(password)
        if(!user || (!compare(hashedPassword, password))){
            throw new UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }

        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);
        
        return { userIdx: user.userIdx, accessToken };

    }

    
    async findOne(userIdx: number){
        return await this.repo.findOneBy({ userIdx });
    }

    async findOneByEmail(email: string){

        return await this.repo.createQueryBuilder()
                        .select('userIdx, password')
                        .where({ email })
                        .andWhere('isDeleted= :YN', { YN: 'N' })
                        .getRawOne();
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

