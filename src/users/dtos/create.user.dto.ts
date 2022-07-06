import { 
    IsEmail,
    IsString, 
    Matches,
    MaxLength,
} from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsString()
    @Matches('[A-Za-z\\d!@#$%^&*()]{10,30}')
    password: string;
}