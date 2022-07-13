import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from './pin.entity';


@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(Pin) private repo: Repository<Pin>,
        private usersService: UsersService) {}

    async createPin(userIdx: number, pinX: number, pinY: number) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const pin = await this.repo.findOneBy({ pinX, pinY });
        console.log(pin);
        
        if(pin) { 
            return pin;
        } else {
            const new_pin = await this.repo.create({ userIdx, pinX, pinY });
            return await this.repo.save(new_pin);
        }
    }



}
