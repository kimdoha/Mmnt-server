import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PinService {
    constructor(
        private userService: UserService
    ) {}

    
}
