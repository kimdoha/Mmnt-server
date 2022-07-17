import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class DistanceRequestDto {
    
    @ApiProperty()
    @IsNumber()
    radius: number;

}