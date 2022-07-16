import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import {  Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { query } from 'express';
import { User } from 'src/users/user.entity';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { Page } from 'src/helpers/page/page';



@Injectable()
export class MomentsService {
    constructor(
        @InjectRepository(Moment) private repo: Repository<Moment>,
        private pinsService: PinsService,
        private usersService: UsersService,
        private connection: Connection,
    ) {}


    async createMoment(userIdx: number, body: CreateMomentDto){
        const { pinX, pinY, ... momentInfo } = body;
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const { pinIdx } = await this.pinsService.createPin(userIdx, pinX, pinY);
            const moment = await this.repo.create({ userIdx, pinIdx, ... momentInfo });
            return await this.repo.save(moment);

        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException(e.response?.message);

        } finally {
            await queryRunner.release();
        }
    }

    async getMyMoments(userIdx: number, query: GetHistoryRequest) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        let moments;

        const limit = Page.getLimit(query.limit);
        const offset = Page.getOffset(query.page, query.limit);
        
        if(query.type === 'main') {
            moments = this.repo.createQueryBuilder('users')
            .select([ 'users.moment_idx, users.title, users.image_url, users.updated_at' ])
            .where('user_idx= :id', { id: userIdx })
            .orderBy('moment_idx', 'DESC')
            .limit(limit)
            .offset(offset)
            .getRawMany();

        } else if(query.type === 'detail') {
            moments = await this.repo.createQueryBuilder()
            .select(['moment_idx, title, description, image_url, youtube_url, music, artist, updated_at' ])
            .addSelect(sq => {
                return sq
                .select(['nickname'])
                .from(User, "user")
                .where('user_idx= :id', { id: userIdx });
            })
            .where("user_idx= :id", { id: userIdx })
            .orderBy("moment_idx", "DESC")
            .limit(limit)
            .offset(offset)
            .getRawMany();
        }

        if(!moments){
            throw new NotFoundException('등록된 모먼트가 없습니다.')
        }
        return moments;
    }


    async deleteMoment(userIdx: number, momentIdx: number, type: string){
        

        if(type == 'moment') {
            
            const user = await this.usersService.findActiveUserByUserIdx(userIdx);
            const moment = await this.repo.findOneBy({ momentIdx, userIdx });
            if(!moment){
                throw new NotFoundException('해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.');
            }

            return await this.repo.delete(momentIdx);

        } else if(type == 'user') {
            return await this.repo.delete(userIdx);

        } else {
            throw new BadRequestException('삭제 경로가 올바르지 않습니다.')
        }
     
        
    }

    async deleteUserInfo(userIdx: number){
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        
        await this.deleteMoment(userIdx, 0, 'user');
        // 핀 삭제 
        // await this.userService.delete({ userIdx });
        
    }
}
