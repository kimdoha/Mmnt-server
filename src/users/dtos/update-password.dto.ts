import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class UpdatePassword {

    @ApiProperty()
    @IsString()
    @Matches('[A-Za-z\\d!@#$%^&*()]{10,30}')
    password: string;
}