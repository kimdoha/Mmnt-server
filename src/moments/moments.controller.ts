import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Query, 
    Res, 
    UseGuards, 
    ValidationPipe 
} from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiBearerAuth, 
    ApiBody, 
    ApiConflictResponse, 
    ApiCreatedResponse, 
    ApiNotFoundResponse, 
    ApiOkResponse, 
    ApiOperation, 
    ApiTags, 
    ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { GetHistoryRequest } from './dtos/get-history-request.dto';
import { getMomentsRequestDto } from './dtos/get-moments-request.dto';
import { ReportRequestDto } from './dtos/report-request.dto';
import { MomentsService } from './moments.service';

@ApiBearerAuth('Authorization')
@ApiTags('moment')
@Controller('moment')
export class MomentsController {

    constructor(private momentsService: MomentsService) {}
    
    
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

    @ApiOperation({ summary: '핀 별 모먼트 리스트 조회 API' })
    @ApiOkResponse({ status: 200, description: '핀 별 모먼트 리스트 조회 성공' })
    @ApiBadRequestResponse({ status: 400, description: 'page, limit 이 올바르지 않습니다.' })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다. | 등록된 모먼트가 없습니다.' })
    @Get('/pin/:pinIdx')
    @UseGuards(JwtAuthGuard)
    async getMoments( 
        @GetUser() user, @Res() res,
        @Param('pinIdx') pinIdx: number, 
        @Query(ValidationPipe) query: getMomentsRequestDto, 
    ){
        const responseData = await this.momentsService.getMomentsByPin(user.userIdx, pinIdx, query);
        return res.json(new SuccessReponse(StatusCodes.OK, `핀 별 모먼트 리스트 조회 성공`, responseData));
    }

    
    @ApiOperation({ summary: '모먼트 삭제 API'})
    @ApiOkResponse({ status: 200, description: '모먼트 삭제 성공' })
    @ApiNotFoundResponse({ status: 404, description: '해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.' })
    @Delete('/:momentIdx')
    @UseGuards(JwtAuthGuard)
    async deleteMoment(@GetUser() user, @Param('momentIdx') momentIdx: number, @Res() res) {
        await this.momentsService.deleteMoment(user.userIdx, momentIdx, 'moment');
        return res.json(new SuccessReponse(StatusCodes.OK, `모먼트 삭제 성공`));
    }


    @ApiOperation({ summary: '회원 탈퇴 API' })
    @ApiOkResponse({ status: 200, description: '회원 탈퇴 성공' })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다.' })
    @Delete('/user/withdrawal')
    @UseGuards(JwtAuthGuard)
    async deleteUserInfo(@GetUser() user, @Res() res) {
        await this.momentsService.deleteUserInfo(user.userIdx);
        return res.json(new SuccessReponse(StatusCodes.OK, '회원 탈퇴 성공'));
    }

    @ApiOperation({ summary: '모먼트 신고하기 API'})
    @ApiOkResponse({ status: 200, description: '모먼트 신고 성공' })
    @ApiNotFoundResponse({ status: 404, description: '해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.' })
    @Post('/report')
    @UseGuards(JwtAuthGuard)
    async reportMoment(@GetUser() user, @Body(ValidationPipe) body: ReportRequestDto, @Res() res) {
        await this.momentsService.reportMoment(user.userIdx, body.momentIdx, body.reason);
        return res.json(new SuccessReponse(StatusCodes.OK, '모먼트 신고 성공'));
    }

}
