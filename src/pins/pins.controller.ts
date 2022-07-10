import { Body, Controller, HttpCode, Post, Query, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { PinsService } from './pins.service';

@ApiTags('pin')
@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}


    async createPin(userIdx: number, pin_x: number, pin_y: number ) {
        return await this.pinsService.createPin(userIdx, pin_x, pin_y);
    }
}
