import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SendCodeDto } from './dtos/send-code.dto';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { ErrorResponse } from 'src/helpers/ErrorResponse';


@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post('/certificate')
    @Serialize(SendCodeDto)
    async certificateUser(@Body() body: CreateUserDto): Promise<SendCodeDto> {

        return await this.userService.createCode(body.phone);
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
function ApiOkResponse() {
    throw new Error('Function not implemented.');
}

