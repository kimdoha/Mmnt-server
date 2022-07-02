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

}
