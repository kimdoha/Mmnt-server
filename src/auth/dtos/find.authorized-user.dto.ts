import { ApiProperty } from '@nestjs/swagger';
import { 
    IsEmail,
    IsString, 
    Length,
} from 'class-validator';

export class FindAuthorizedUserDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @Length(6)
    value: string;
}