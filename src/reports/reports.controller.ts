import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { ReportsService } from './reports.service';
import { ReportRequestDto } from './dtos/report-request.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get.user.decorator';
import { SuccessReponse } from '../helpers/success-reponse.helper';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiOperation({ summary: '모먼트 신고하기 API' })
  @ApiOkResponse({ status: 200, description: '모먼트 신고 성공' })
  @ApiNotFoundResponse({
    status: 404,
    description: '해당 모먼트는 삭제 되었습니다.',
  })
  @ApiConflictResponse({
    status: 409,
    description: '이미 신고한 모먼트입니다.',
  })
  @Post('/report')
  @UseGuards(JwtAuthGuard)
  async reportMoment(
    @GetUser() user,
    @Body(ValidationPipe) body: ReportRequestDto,
    @Res() res,
  ) {
    await this.reportsService.reportMoment(
      user.userIdx,
      body.momentIdx,
      body.reason,
    );
    return res.json(new SuccessReponse(StatusCodes.OK, '모먼트 신고 성공'));
  }
}
