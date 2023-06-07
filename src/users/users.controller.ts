import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetProfileInfoResponse } from 'src/common/responses/users/get.profile-Info.response.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignUpResponseDto } from 'src/common/responses/users/sign-up.response.dto';
import { SignInResponseDto } from 'src/common/responses/users/sign-in.response.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { UpdateUserInfo } from './dtos/update-userInfo.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '회원 가입 API' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    status: 201,
    description: '회원 가입 성공',
    type: SignUpResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post('/sign-up')
  async signup(
    @Body(ValidationPipe) body: CreateUserDto,
    @Res() res,
  ): Promise<any> {
    const responseData = await this.userService.createUser(
      body.email,
      body.password,
    );
    return res.json(
      new SuccessReponse(StatusCodes.CREATED, '회원 가입 성공', responseData),
    );
  }

  @ApiOperation({ summary: '로그인 API' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    status: 201,
    description: '로그인 성공',
    type: SignInResponseDto,
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: '유저 정보가 올바르지 않습니다.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '해당 유저가 존재하지 않습니다.',
  })
  @Post('/sign-in')
  async signin(@Body(ValidationPipe) body: CreateUserDto, @Res() res) {
    const responseData = await this.userService.signIn(
      body.email,
      body.password,
    );
    return res.json(
      new SuccessReponse(StatusCodes.CREATED, '로그인 성공', responseData),
    );
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '유저 정보 변경 | 비밀 번호 찾기 API',
    description: `이메일, 비밀번호, 닉네임 변경 가능. 
        이메일 변경 시, [인증 번호 발송] API를 먼저 사용해주세요.`,
  })
  @ApiOkResponse({
    status: 200,
    description: '유저 정보 변경 성공',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '해당 유저가 존재하지 않습니다.',
  })
  @Patch('')
  @UseGuards(JwtAuthGuard)
  async updateUserInfo(
    @GetUser() user,
    @Body(ValidationPipe) body: UpdateUserInfo,
    @Res() res,
  ): Promise<any> {
    await this.userService.updateUserInfo(user.userIdx, body);
    return res.json(new SuccessReponse(StatusCodes.OK, '유저 정보 변경 성공'));
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '유저 프로필 조회 API',
    description: '유저 핀 | 모먼트 개수 확인 가능합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '유저 프로필 조회 성공',
    type: GetProfileInfoResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '해당 유저가 존재하지 않습니다.',
  })
  @Get('/profile-info')
  @UseGuards(JwtAuthGuard)
  async findProfileInfo(@GetUser() user, @Res() res): Promise<any> {
    const responseData = await this.userService.getDetailUserInfo(user.userIdx);
    return res.json(
      new SuccessReponse(StatusCodes.OK, '내 프로필 조회 성공', responseData),
    );
  }

  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '유저 위치 수정 및 근처 핀 모먼트 조회 API',
    description: 'radius(m) : 50m 일 경우 50 입력',
  })
  @ApiBody({ type: UpdateLocationDto })
  @ApiOkResponse({
    status: 200,
    description: '유저 위치 수정 성공',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '해당 유저가 존재하지 않습니다.',
  })
  @Patch('/location')
  @UseGuards(JwtAuthGuard)
  async updateUserLocation(
    @GetUser() user,
    @Body(ValidationPipe) body: UpdateLocationDto,
    @Res() res,
  ) {
    const responseData = await this.userService.updateUserLocation(
      user.userIdx,
      body.latitude,
      body.longitude,
      body.radius,
    );
    return res.json(
      new SuccessReponse(StatusCodes.OK, '유저 위치 수정 성공', responseData),
    );
  }
}
