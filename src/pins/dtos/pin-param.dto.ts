import { IsNumber, Min } from 'class-validator';

export class PinParamDto {
  @IsNumber()
  @Min(1)
  pinIdx: number;
}
