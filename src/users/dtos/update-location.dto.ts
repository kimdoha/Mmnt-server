import { ApiProperty } from '@nestjs/swagger';
import { 
    IsLongitude, 
    IsLatitude, 
    IsNumber, 
    Min,
    Max
} from 'class-validator';

export class UpdateLocationDto {
    
    @ApiProperty({
        description: '유저 위치 경도',
    })
    @IsNumber()
    @IsLongitude()
    locationX: number;

    @ApiProperty({
        description: '유저 위치 위도',
    })
    @IsNumber()
    @IsLatitude()
    locationY: number;

    @ApiProperty({
        description: '위치 반경(m)',
    })
    @IsNumber()
    @Min(10)
    @Max(5000)
    radius: number;
}