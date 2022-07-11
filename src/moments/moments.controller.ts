import { Body, Controller, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { FormDataRequest, MemoryStoredFile } from 'nestjs-form-data';
import { GetUser } from 'src/common/decorators/get.user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SuccessReponse } from 'src/helpers/SuccessReponse';
import { CreateMomentDto } from './dtos/create-moment.dto';
import { MomentsService } from './moments.service';

@ApiTags('moment')
@Controller('moment')
export class MomentsController {

    constructor(private momentsService: MomentsService) {}
    
    // @ApiOperation({ summary: '핀 및 모먼트 생성 API' })
    // @Post()
    // @UseGuards(JwtAuthGuard)
    // async createMoment(@GetUser() user, @Body(ValidationPipe) body: CreateMomentDto, @Res() res){
    //     console.log(body);
        
    //     const responseData = await this.momentsService.createMoment(user.userIdx, body);
    //     return res.json(new SuccessReponse(StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    // }

    @ApiOperation({ summary: '핀 및 모먼트 생성 API' })
    @Post()
    @FormDataRequest({storage: MemoryStoredFile})
    @UseGuards(JwtAuthGuard)
    async createMoment(
        @GetUser() user, 
    @Body(ValidationPipe) body: CreateMomentDto, @Res() res){
     
        console.log(body);
        
        // const responseData = await this.momentsService.createMoment(user.userIdx, body);
        // return res.json(new SuccessReponse(StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    }

}
