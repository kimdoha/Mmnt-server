import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { REASON } from '../../common/constants/reports.constant';

export class ReportRequestDto {
  @IsNumber()
  momentIdx: number;

  @IsEnum(REASON)
  @IsNotEmpty()
  reason: REASON;
}
