import { ApiProperty } from '@nestjs/swagger';
import { 
    IsEmail,
    IsString,
} from 'class-validator'

export class CreateAuthorizedCodeDto {
    
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

}