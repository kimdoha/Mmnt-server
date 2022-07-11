import { ApiProperty } from '@nestjs/swagger';
import { 
    IsLatitude, 
    IsLongitude, 
    IsNumber, 
    IsString, 
    IsUrl 
} from 'class-validator';

export class CreateMomentDto {
    
    @ApiProperty()
    @IsNumber()
    @IsLongitude()
    pin_x: number;

    @ApiProperty()
    @IsNumber()
    @IsLatitude()
    pin_y: number;
    
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsUrl()
    imageUrl: string

    @ApiProperty()
    @IsUrl()
    youtubeUrl: string;

    @ApiProperty()
    @IsString()
    music: string;

    @ApiProperty()
    @IsString()
    artist: string;    
}