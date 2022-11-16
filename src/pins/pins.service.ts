import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from './pin.entity';

@Injectable()
export class PinsService {
  constructor(
    @InjectRepository(Pin) private repo: Repository<Pin>,
    private usersService: UsersService,
  ) {}

  async createPin(userIdx: number, pinX: number, pinY: number) {
    const user = await this.usersService.findActiveUserByUserIdx(userIdx);
    const pin = await this.repo.findOneBy({ pinX, pinY });

    if (pin) {
      return pin;
    } else {
      // await this.cacheManager.set(email, value, { ttl: 180 });
      const new_pin = await this.repo.create({ pinX, pinY });
      return await this.repo.save(new_pin);
    }
  }

  async findActivePinByPinIdx(pinIdx: number) {
    const pin = await this.repo.findOneBy({ pinIdx });
    if (!pin) {
      throw new NotFoundException('해당 핀을 찾을 수 없습니다.');
    }
    return pin;
  }

  async deletePin(pinIdx: number) {
    const pin = await this.findActivePinByPinIdx(pinIdx);
    return await this.repo.delete({ pinIdx });
  }
}
