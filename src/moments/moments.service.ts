import { Injectable } from '@nestjs/common';
import { PinsService } from 'src/pins/pins.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MomentsService {
    constructor(
        private pinsService: PinsService,
        private usersService: UsersService
    ) {}
}
