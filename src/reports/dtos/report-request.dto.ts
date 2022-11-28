import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { REASON } from '../../common/constants/reports.constant';

export class ReportRequestDto {
  @ApiProperty()
  @IsNumber()
  momentIdx: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: REASON;
}
