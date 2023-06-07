import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsObject, Max, Min } from 'class-validator';

export class UpdateLocationDto {

  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;

  @IsNumber()
  @Min(10)
  @Max(5000)
  radius: number;
}
