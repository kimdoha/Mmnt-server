import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { REASON } from '../../common/constants/reports.constant';

export class ReportRequestDto {
  @ApiProperty()
  @IsNumber()
  momentIdx: number;

  @ApiProperty()
  @IsEnum(REASON)
  @IsNotEmpty()
  reason: REASON;
}
