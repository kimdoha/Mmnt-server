import { Controller } from '@nestjs/common';
import { PinService } from 'src/pin/pin.service';
import { UserService } from 'src/user/user.service';

@Controller('moment')
export class MomentController {
    constructor(
        private pinService: PinService,
        private userService: UserService
    ) {}
}
