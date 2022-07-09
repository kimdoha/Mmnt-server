import { Injectable } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './moment.entity';
import { CreateMomentDto } from './dtos/create-moment.dto';

@Injectable()
export class MomentsService {
    constructor(
        @InjectRepository(Moment) private repo: Repository<Moment>,
        private pinsService: PinsService,
        private usersService: UsersService
    ) {}


    async createMoment(userIdx: number, body: CreateMomentDto){
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const pin = await this.pinsService.createPin(userIdx, body.pin_x, body.pin_y);
        console.log(pin);

        await this.repo.save({});
    }
}
