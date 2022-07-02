import { Injectable } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Moment } from './moment.entity';

@Injectable()
export class MomentsService {
    constructor(
        @InjectRepository(Moment) private repo: Repository<Moment>,
        private pinsService: PinsService,
        private usersService: UsersService
    ) {}
}
