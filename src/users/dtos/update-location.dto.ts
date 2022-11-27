import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class UpdateLocationDto {
  @ApiProperty({
    description: '유저 위치 경도',
  })
  @IsLongitude()
  locationX: number;

  @ApiProperty({
    description: '유저 위치 위도',
  })
  @IsLatitude()
  locationY: number;

  @ApiProperty({
    description: '위치 반경(m)',
    minimum: 10,
    maximum: 5000,
  })
  @IsNumber()
  radius: number;
}
