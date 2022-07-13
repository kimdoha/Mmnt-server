import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { Pin } from 'src/pins/pin.entity';
import { Moment } from 'src/moments/moment.entity';





@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,
    ) {}


    async createUser(email: string, password: string) {

        const user: User = await this.findUserByEmail(email);
        if(user){
            throw new BadRequestException('중복된 이메일입니다.');
        }
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const new_user = await this.repo.create({ email, password: hashedPassword });

        const { userIdx } = await this.repo.save(new_user);
        await this.repo.update(userIdx, { nickname:`${userIdx}번째 익명이` } );

        return { userIdx, email };

    }

    async signIn(email: string, password: string){
        const payload = await this.validateUser(email, password);

        return await this.login(payload);
    }

    async updateUserLocation(userIdx: number, location: UpdateLocationDto) {
        const user = await this.repo.findOneBy({ userIdx });
        console.log(user);
        return await this.repo.update(userIdx, location);
    }
    
    
    async findUserByEmail(email: string): Promise<User> {
        return this.repo.createQueryBuilder()
        .select(['userIdx, password'])
        .where({ email })
        .andWhere('isDeleted= :YN', { YN: 'N' })
        .getRawOne();
    }

    async getDetailUserInfo(userIdx: number){
        const user = await this.repo.createQueryBuilder()
            .select(['userIdx, email, nickname, profileImgUrl'])
            .addSelect(sq => {
                return sq
                .select('Count(userIdx)')
                .from(Pin, "pin")
                .where({ userIdx });
                
            }, 'finCount')
            .addSelect(sq => {
                return sq
                .select('Count(userIdx)')
                .from(Moment, "moment")
                .where({ userIdx });
            }, 'momentCount')
            .where({ userIdx })
            .andWhere('isDeleted= :YN', { YN: 'N' })
            .getRawOne();

        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }

    async findActiveUserByUserIdx(userIdx: number){
        const user = await this.repo.createQueryBuilder()
            .select(['userIdx'])
            .where({ userIdx })
            .andWhere('isDeleted= :YN', { YN: 'N' })
            .getRawOne();

        if(!user){
            throw new NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        
        return user;
    }

    // async update(userIdx: number, attrs: Partial<User>){
    //     const user = await this.findOne(userIdx);
    //     if(!user){
    //         throw new NotFoundException('user not found');
    //     }
    //     Object.assign(user, attrs);
    //     return this.repo.save(user);
    // }

    // async remove(userIdx: number){
    //     const user = await this.findOne(userIdx);
    //     if(!user){
    //         throw new NotFoundException('user not found');
    //     }

    //     return this.repo.remove(user);
    // }

    async validateUser(email: string, password: string){
        const user = await this.findUserByEmail(email);

        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }

        return { id: user.userIdx, email };
    }

    async login(payload): Promise<SignInResponseDto>{
        const { id, email } = payload;
        return { 
            userIdx: id, 
            accessToken: await this.jwtService.signAsync(payload) 
        };
    }
}

