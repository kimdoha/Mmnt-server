import { Body, Controller, HttpCode, Post, Query, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userInfo } from 'os';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { PinsService } from './pins.service';

@ApiTags('pin')
@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}


    async createPin(userIdx: number, pinX: number, pinY: number ) {
        return await this.pinsService.createPin(userIdx, pinX, pinY);
    }
}
