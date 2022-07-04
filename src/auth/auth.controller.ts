import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreateAuthorizedCodeResponseDto } from '../common/response/auth/create.authorized-code.response.dto';
import { FindAuthorizedUserDto } from './dtos/find.authorized-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('')
    @Serialize(CreateAuthorizedCodeResponseDto)
    async certificateUser(@Body() body: CreateUserDto, @Res() res) {
        const responseData = await this.authService.createAuthorizedCode(body.phone);
        return res
        .status(StatusCodes.CREATED)
        .json(new SuccessReponse(StatusCodes.CREATED, '인증 번호 발송 성공', responseData));
    }

    @Get('/verification')
    async validate(@Query() query: FindAuthorizedUserDto, @Res() res){
        await this.authService.verifyAuthorizedCode(query.phone, query.value);
        return res
        .status(StatusCodes.OK)
        .json(new SuccessReponse(StatusCodes.OK, '인증 확인 성공'));
    }
}
