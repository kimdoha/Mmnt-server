import { 
    IsLatitude, 
    IsLongitude, 
    IsNumber, 
    IsString, 
    IsUrl 
} from 'class-validator';

export class CreateMomentDto {
    
    @IsNumber()
    @IsLongitude()
    pin_x: number;

    @IsNumber()
    @IsLatitude()
    pin_y: number;
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsUrl()
    imageUrl: string;

    @IsUrl()
    youtubeUrl: string;

    @IsString()
    music: string;

    @IsString()
    artist: string;    
}