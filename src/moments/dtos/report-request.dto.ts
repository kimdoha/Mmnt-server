import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ReportRequestDto {
    @ApiProperty()
    @IsNumber()
    momentIdx: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    reason: string
}