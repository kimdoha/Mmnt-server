import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    Param, 
    Post, 
    Query, 
    Res, 
    UseGuards, 
    ValidationPipe 
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { userInfo } from 'os';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { DistanceRequestDto } from '../users/dtos/distance-request.dto';
import { PinParamDto } from './dtos/pin-param.dto';
import { PinsService } from './pins.service';

@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}


    
}
