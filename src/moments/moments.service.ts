import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import {  Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { query } from 'express';


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

    async getMomentDetailInfo(momentIdx: number) {
        const moment = await this.repo.findOneBy({ momentIdx });
        if(!moment){
            throw new NotFoundException('삭제된 모먼트 입니다.');
        }

        return moment;
    }

}
