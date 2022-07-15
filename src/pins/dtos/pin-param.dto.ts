import { ApiProperty } from "@nestjs/swagger";
import { IsNumber,Min } from "class-validator";

export class PinParamDto {
    
    @ApiProperty()
    @IsNumber()
    @Min(1)
    pinIdx: number;

}