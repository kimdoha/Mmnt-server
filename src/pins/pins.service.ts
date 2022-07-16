import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from './pin.entity';
import { NotFoundError } from 'rxjs';


@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(Pin) private repo: Repository<Pin>,
        private usersService: UsersService) {}

    async createPin(userIdx: number, pinX: number, pinY: number) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const pin = await this.repo.findOneBy({ pinX, pinY });
        
        if(pin) { 
            return pin;
        } else {
            const new_pin = await this.repo.create({ pinX, pinY });
            return await this.repo.save(new_pin);
        }
    }

    async getPinLists(locationX: number, locationY: number){
        
        const distance_tb = await this.repo.createQueryBuilder()
                            .select(`ST_DistanceSphere(
                                    ST_GeomFromText('POINT(' || ${ locationX } || ' ' || ${ locationY } || ')', 4326),
                                    ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y } || ')', 4326 )`)
                            .getRawOne();


        console.log(distance_tb);

        return distance_tb;
    }
    
    async findActivePinByPinIdx(pinIdx: number){
        const pin = await this.repo.findOneBy({ pinIdx });
        if(!pin){
            throw new NotFoundException('해당 핀을 찾을 수 없습니다.');
        }
        return pin;
    }
    
    async deletePin(pinIdx: number) {
        const pin = await this.findActivePinByPinIdx(pinIdx);
        return await this.repo.delete({ pinIdx });
    }

}
