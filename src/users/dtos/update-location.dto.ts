import { IsLatitude, IsLongitude, IsNumber, Max, Min } from 'class-validator';

export class UpdateLocationDto {

  @IsLongitude()
  locationX: number; // 경도

  @IsLatitude()
  locationY: number; // 위도


  @IsNumber()
  @Min(10)
  @Max(5000)
  radius: number;
}
