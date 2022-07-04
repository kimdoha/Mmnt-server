import { Body, Controller, Get, Param, Post, Query, Res, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';


@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}

    // @Serialize(CreateAuthorizedCodeResponseDto)
    @Post('sign-up')
    async signup(@Body(ValidationPipe) body: CreateUserDto, @Res() res){
        const responseData = await this.userService.createUser(body.email, body.password);

        return res
        .status(StatusCodes.CREATED)
        .json(new SuccessReponse(StatusCodes.CREATED, '회원 가입 성공', responseData));
    }

    @Post('sign-in')
    async signin(@Body(ValidationPipe) body: CreateUserDto, @Res() res){
        const responseData = await this.userService.signIn(body.email, body.password);

        return res
        .status(StatusCodes.CREATED)
        .json(new SuccessReponse(StatusCodes.CREATED, '로그인 성공', responseData));
    }

    @Get('/:userIdx')
    async findUser(@Param('userIdx') userIdx: string){
        const user = await this.userService.findOne(parseInt(userIdx));
    }

}


