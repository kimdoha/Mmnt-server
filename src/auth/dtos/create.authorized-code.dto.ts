import { 
    IsEmail,
    IsOptional, 
    IsString,
} from 'class-validator'

export class CreateAuthorizedCodeDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}