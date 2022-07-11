import { ApiProperty } from '@nestjs/swagger';
import { 
    IsEmail,
    IsOptional, 
    IsString,
} from 'class-validator'

export class CreateAuthorizedCodeDto {
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string;
}