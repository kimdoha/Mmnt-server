import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
    
    @ApiProperty({
        description: '유저 위치 경도',
    })
    locationX: number;

    @ApiProperty({
        description: '유저 위치 위도',
    })
    locationY: number;

    @ApiProperty({
        description: '위치 반경(m)',
        minimum: 10,
        maximum: 5000,
    })
    radius: number;
}