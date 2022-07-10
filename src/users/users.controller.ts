import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Query, 
    Res, 
    ValidationPipe, 
    UseGuards, 
    UseInterceptors,
    NotFoundException,
    Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { CommonResponseInterceptor } from 'src/common/interceptors/common.response.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetProfileInfoResponse } from 'src/common/responses/users/get.profile-Info.response.dto';
import { User } from './user.entity';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignUpResponseDto } from 'src/common/responses/users/sign-up.response.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';


@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({ summary: '회원 가입 API' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ status: 201, description: '회원 가입 성공', type: SignUpResponseDto })
    @ApiBadRequestResponse({ status: 400, description: '중복된 이메일 외 Bad Request' })
    @Post('sign-up')
    async signup(@Body(ValidationPipe) body: CreateUserDto, @Res() res) : Promise<any>{
        const responseData = await this.userService.createUser(body.email, body.password);

        return res.json(new SuccessReponse(StatusCodes.CREATED, '회원 가입 성공', responseData));
    }

    @ApiOperation({ summary: '로그인 API' })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ status: 201, description: '로그인 성공', type: SignInResponseDto })
    @ApiUnauthorizedResponse({ status: 401, description: '유저 정보가 올바르지 않습니다.' })
    @Post('sign-in')
    async signin(@Body(ValidationPipe) body: CreateUserDto, @Res() res) {
        const responseData = await this.userService.signIn(body.email, body.password);

        return res.json(new SuccessReponse(StatusCodes.CREATED, '로그인 성공', responseData));
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: '유저 프로필 조회' })
    @ApiOkResponse({ status: 200, description: '유저 프로필 조회 성공', type: GetProfileInfoResponse })
    @ApiNotFoundResponse({ status: 404, description: '해당 유저가 존재하지 않습니다' })
    @Get('/profile-info')
    @UseGuards(JwtAuthGuard)
    async findProfileInfo(@GetUser() user, @Res() res): Promise<any>{
        
        const responseData: User = await this.userService.findUserByUserIdx(user.userIdx);
        return res.json(new SuccessReponse(StatusCodes.OK, '내 프로필 조회 성공', responseData));
    }

    @ApiBearerAuth('Authorization')
    @ApiOperation({ summary: '유저 위치 수정' })
    @ApiBody({ type: UpdateLocationDto })
    @ApiOkResponse({ status: 200, description: '유저 위치 수정 성공', type: GetProfileInfoResponse })
    @Patch('/location')
    @UseGuards(JwtAuthGuard)
    async updateUserLocation(
        @GetUser() user, 
        @Body(ValidationPipe) body: UpdateLocationDto, 
        @Res() res) {
        await this.userService.updateUserLocation(user.userIdx, body);
        return res.json(new SuccessReponse(StatusCodes.OK, '유저 위치 수정 성공'));
    }

    
}


