import { 
    IsLatitude, 
    IsLongitude, 
    IsNumber, 
    IsString, 
    IsUrl 
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';
// import { UploadImage } from 'src/uploads/dtos/upload-image.dto';

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

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    imageFile: MemoryStoredFile;


    @IsUrl()
    youtubeUrl: string;

    @IsString()
    music: string;

    @IsString()
    artist: string;    
}