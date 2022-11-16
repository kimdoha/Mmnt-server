import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, Max } from 'class-validator';

export abstract class PageRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  page: number | 1;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @Max(50)
  @Type(() => Number)
  limit: number | 10;
}
