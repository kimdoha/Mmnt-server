import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SendCodeDto } from './dtos/send-code.dto';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';


@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('')
    @Serialize(SendCodeDto)
    async certificateUser(@Body() body: CreateUserDto, @Res() res) {
        const responseData = await this.userService.createCode(body.phone);
        return res
        .status(StatusCodes.CREATED)
        .json(new SuccessReponse(StatusCodes.CREATED, '인증 번호 발송 성공', responseData));
    }

    @Get('/certificate')
    async validate(@Body() body: SendCodeDto){
        return await this.userService.verifyCode(body.phone, body.value);
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


