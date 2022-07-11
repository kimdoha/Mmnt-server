import { Body, Controller, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { MomentsService } from './moments.service';

@ApiTags('moment')
@Controller('moment')
export class MomentsController {

    constructor(private momentsService: MomentsService) {}
    
    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: '핀 및 모먼트 생성 API' })
    @ApiBody({ type: CreateMomentDto })
    @ApiCreatedResponse({ status: 201, description: '핀 및 모먼트 생성 성공' })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다.' })
    @Post()
    @UseGuards(JwtAuthGuard)
    async createMoment(@GetUser() user, @Body(ValidationPipe) body: CreateMomentDto, @Res() res){
        
        const responseData = await this.momentsService.createMoment(user.userIdx, body);
        return res.json(new SuccessReponse(StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    }


}
