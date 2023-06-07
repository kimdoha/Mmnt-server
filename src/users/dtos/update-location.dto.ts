import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsObject, Max, Min } from 'class-validator';
import { ILocation } from 'src/common/interfaces/location.interface';

type Location = {
  longitude: number;
  latitude: number;
}

export class UpdateLocationDto {

  @IsObject()
  @Type(() => Location)
  location: ILocation;


  @IsNumber()
  @Min(10)
  @Max(5000)
  radius: number;
}
