import { Body, Controller, Get, Param, Post, Query, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { MomentsService } from './moments.service';

@ApiTags('moment')
@Controller('moment')
export class MomentsController {

    constructor(private momentsService: MomentsService) {}
    
    @ApiBearerAuth('Authorization')
    @ApiOperation({ 
        summary: '핀 및 모먼트 생성 API', 
        description: '이미지 파일은 "이미지 URL 생성 API"로 변환 후 URL 을 입력해주시면 됩니다.'
    })
    @ApiBody({ type: CreateMomentDto })
    @ApiCreatedResponse({ status: 201, description: '핀 및 모먼트 생성 성공' })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다.' })
    @Post()
    @UseGuards(JwtAuthGuard)
    async createMoment(@GetUser() user, @Body(ValidationPipe) body: CreateMomentDto, @Res() res){
        
        const responseData = await this.momentsService.createMoment(user.userIdx, body);
        return res.json(new SuccessReponse(StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    }

    
    @ApiBearerAuth('Authorization')
    @ApiOperation({ 
        summary: '나의 모먼트 히스토리 조회 API', 
        description: 
        `[type] main : 나의 모먼트 피드 전체 조회,  detail : 나의 모먼트 상세 조회 </br>
         [page] page 는 1부터 시작합니다.`
    })
    @ApiOkResponse({ status: 200, description: '나의 모먼트 피드 조회 성공' })
    @ApiBadRequestResponse({ status: 400, description: 'type, page, limit 이 올바르지 않습니다.' })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다. | 등록된 모먼트가 없습니다.' })
    @Get('/my-history')
    @UseGuards(JwtAuthGuard)
    async getMyMomentHistory(@GetUser() user, @Query(ValidationPipe) query: GetHistoryRequest, @Res() res) {
           
        const responseData = await this.momentsService.getMyMoments(user.userIdx, query);
        return res.json(new SuccessReponse(StatusCodes.OK, `나의 모먼트 피드 조회 성공`, responseData))
    }

}
