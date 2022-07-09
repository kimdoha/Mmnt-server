import { Injectable } from '@nestjs/common';
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
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const { pin_x, pin_y, ... momentInfo } = body;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { pinIdx } = await this.pinsService.createPin(userIdx, pin_x, pin_y);
            const moment = await this.repo.create({ pinIdx, ... momentInfo });
            return await this.repo.save(moment);

        } catch (e) {
            await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();
        }
    }
}
