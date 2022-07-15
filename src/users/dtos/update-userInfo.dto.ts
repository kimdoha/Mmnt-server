import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class UpdateUserInfo {

    @ApiProperty()
    @IsEmail()
    @MaxLength(50)
    @IsOptional()
    email: string;


    @ApiProperty()
    @IsString()
    @Matches('[A-Za-z\\d!@#$%^&*()]{10,30}')
    @IsOptional()
    password: string;


    @ApiProperty()
    @IsString()
    @MaxLength(45)
    @IsOptional()
    nickname: string;

}