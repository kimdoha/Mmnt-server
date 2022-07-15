import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class DistanceRequestDto {
    
    @ApiProperty()
    @IsNumber()
    @Max(3000)
    @Min(10)
    distance: number = 50;

}