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
    UseInterceptors
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';

import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { StatusCodes } from 'http-status-codes';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { SignUpResponseDto } from 'src/common/responses/auth/signup.response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { CommonResponseInterceptor } from 'src/common/interceptors/common.response.interceptor';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetProfileInfo } from 'src/common/responses/users/get.profile-Info.response.dto';


@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) {}

    // 3. 회원 가입 
    @Post('sign-up')
    async signup(@Body(ValidationPipe) body: CreateUserDto, @Res() res){
        const responseData = await this.userService.createUser(body.email, body.password);

        return res.json(new SuccessReponse(StatusCodes.CREATED, '회원 가입 성공', responseData));
    }


    @Post('sign-in')
    async signin(@Body(ValidationPipe) body: CreateUserDto, @Res() res){
        const responseData = await this.userService.signIn(body.email, body.password);

        return res.json(new SuccessReponse(StatusCodes.CREATED, '로그인 성공', responseData));
    }

    @Get('/profile-info')
    @UseGuards(JwtAuthGuard)
    async findProfileInfo(@GetUser() user, ): Promise<GetProfileInfo>{

        const find_user = await this.userService.findOne(user);
        console.log('find_user:    ', find_user);
        return ;
    }

}


