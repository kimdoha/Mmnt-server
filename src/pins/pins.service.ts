import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        console.log(pin);
        
        if(pin) { 
            return pin;
        } else {
            const new_pin = await this.repo.create({ userIdx, pinX, pinY });
            return await this.repo.save(new_pin);
        }
    }

    async getPinInfo(userIdx: number, pinIdx: number, distance: number){
        
        const { locationX, locationY } = await this.usersService.findActiveUserByUserIdx(userIdx);
        const { pinX, pinY } = await this.findActivePinByPinIdx(pinIdx);

        // const exist = await dataSource.createQueryBuilder()
        //                 .select([ST_DistanceSphere(
        //                     ST_GeomFromText('POINT(' || location_x || ' ' || location_y || ')', 4326),
        //                     ST_GeomFromText('POINT(' || location_x || ' ' || location_y || ')', 4326)
        //                 ) < distance , 'exist']);
        // console.log(exist);
        
        return ;
    }
    
    async findActivePinByPinIdx(pinIdx: number){
        const pin = await this.repo.findOneBy({ pinIdx });
        if(!pin){
            throw new NotFoundException('해당 핀을 찾을 수 없습니다.');
        }
        return pin;
    }

    async deletePin(pinIdx: number, userIdx: number, type: string){
        
    }

}
