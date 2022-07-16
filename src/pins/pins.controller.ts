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
import { DistanceRequestDto } from './dtos/distance-request.dto';
import { PinParamDto } from './dtos/pin-param.dto';
import { PinsService } from './pins.service';

@ApiTags('pin')
@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}

    @ApiOperation({ 
        summary: '핀 조회 API',
        description: '내 위치 변경 시, [유저 위치 수정] 후 해당 API 이용'
    })
    @ApiOkResponse({ status: 200, description: '핀 조회 성공' })
    @Get('/:pinIdx')
    @UseGuards(JwtAuthGuard)
    async getPinInfo(
        @GetUser() user,
        @Param(ValidationPipe) param: PinParamDto, 
        @Query(ValidationPipe) query: DistanceRequestDto, @Res() res
    ) {
        // const responseData = await this.pinsService.getPinInfo(user.userIdx, param.pinIdx, query.distance);
        // return res.json(new SuccessReponse(StatusCodes.OK, '핀 조회 성공', responseData));
    }

    
}
