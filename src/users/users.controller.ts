import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';

import { CreateAuthorizedCodeResDto } from '../auth/dtos/create-authorized-code-res.dto';
import { FindAuthorizedUserDto } from '../auth/dtos/find-authorized-user.dto';


@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('')
    @Serialize(CreateAuthorizedCodeResDto)
    async certificateUser(@Body() body: CreateUserDto, @Res() res) {
        const responseData = await this.userService.createAuthorizedCode(body.phone);
        return res
        .status(StatusCodes.CREATED)
        .json(new SuccessReponse(StatusCodes.CREATED, '인증 번호 발송 성공', responseData));
    }

    @Get('/verification')
    async validate(@Query() query: FindAuthorizedUserDto, @Res() res){
        await this.userService.verifyAuthorizedCode(query.phone, query.value);
        return res
        .status(StatusCodes.OK)
        .json(new SuccessReponse(StatusCodes.OK, '인증 확인 성공'));
    }

    @Post('/sign-up')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.phone, body.password);
    }

    @Get('/:userIdx')
    async findUser(@Param('userIdx') userIdx: string){
        const user = await this.userService.findOne(userIdx);
    }

}


