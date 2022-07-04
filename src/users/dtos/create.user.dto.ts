import { 
    IsEmail,
    IsOptional, 
    IsString, 
    Length,
} from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}