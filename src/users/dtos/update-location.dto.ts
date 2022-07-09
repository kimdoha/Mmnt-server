import { 
    IsLongitude, 
    IsLatitude, 
    IsNumber 
} from 'class-validator';

export class UpdateLocationDto {

    @IsNumber()
    @IsLongitude()
    location_x: number;

    @IsNumber()
    @IsLatitude()
    location_y: number;

}