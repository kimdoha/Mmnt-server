import { Body, Controller, Post, Res } from '@nestjs/common';

import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/success-reponse.helper';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { CreateAuthorizedCodeDto } from 'src/auth/dtos/create.authorized-code.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { CreateAuthorizedCodeResponseDto } from '../common/responses/auth/create.authorized-code.response.dto';
import { FindAuthorizedUserDto } from './dtos/find.authorized-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '인증 번호 발송 API',
    description: '이메일 발송 추가 완료',
  })
  @ApiBody({ type: CreateAuthorizedCodeDto })
  @ApiCreatedResponse({ status: 201, description: '인증 번호 발송 성공' })
  @ApiConflictResponse({
    status: 409,
    description: '인증 번호 발송에 실패했습니다.',
  })
  @Post('')
  @Serialize(CreateAuthorizedCodeResponseDto)
  async certificateUser(@Body() body: CreateAuthorizedCodeDto, @Res() res) {
    const responseData = await this.authService.createAuthorizedCode(
      body.email,
    );
    return res.json(
      new SuccessReponse(
        StatusCodes.CREATED,
        '인증 번호 발송 성공',
        responseData,
      ),
    );
  }

  @ApiOperation({ summary: '인증 번호 확인 API' })
  @ApiCreatedResponse({ status: 201, description: '인증 확인 성공' })
  @ApiNotFoundResponse({
    status: 404,
    description: '인증 번호가 올바르지 않습니다.',
  })
  @Post('/verification')
  async validate(@Body() body: FindAuthorizedUserDto, @Res() res) {
    const responseData = await this.authService.verifyAuthorizedCode(
      body.email,
      body.value,
    );
    return res.json(
      new SuccessReponse(StatusCodes.CREATED, '인증 확인 성공', responseData),
    );
  }
}
