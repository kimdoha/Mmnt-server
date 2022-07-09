import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from './pin.entity';


@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(Pin) private repo: Repository<Pin>,
        private usersService: UsersService) {}

    async createPin(userIdx: number, pin_x: number, pin_y: number) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const pin = await this.repo.create({ userIdx, pin_x, pin_y });
        return await this.repo.save(pin);
    }



}
