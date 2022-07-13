import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import {  Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { query } from 'express';
import { User } from 'src/users/user.entity';



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

    async getMyMoments(userIdx: number, type: string) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        let moments;

        if(type === 'main') {
            moments = this.repo.createQueryBuilder()
            .select([ 'moment_idx, title, image_url, updated_at' ])
            .where("user_idx= :id", { id: userIdx })
            .orderBy("moment_idx", "DESC")
            .getRawMany();

        } else if(type === 'detail') {
            moments = await this.repo.createQueryBuilder()
            .select(['moment_idx, title, description, image_url, youtube_url, music, artist, updated_at' ])
            .addSelect(sq => {
                return sq
                .select(['nickname'])
                .from(User, "user")
                .where('user_idx= :user_idx', { user_idx: userIdx });
            })
            .where("user_idx= :id", { id: userIdx })
            .orderBy("moment_idx", "DESC")
            .getRawMany();

        } else {
            throw new BadRequestException('type 이 올바르지 않습니다.')
        }

        if(!moments){
            throw new NotFoundException('등록된 모먼트가 없습니다.')
        }
        return moments;
    }

}
