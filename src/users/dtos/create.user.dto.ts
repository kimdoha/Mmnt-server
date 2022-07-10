import { ApiProperty } from '@nestjs/swagger';
import { 
    IsEmail,
    IsString, 
    Matches,
    MaxLength,
} from 'class-validator'

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @ApiProperty()
    @IsString()
    @Matches('[A-Za-z\\d!@#$%^&*()]{10,30}')
    password: string;
}