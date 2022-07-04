import { 
    IsOptional, 
    IsString, 
    Length,
    NotContains
} from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @Length(8, 15)
    @NotContains('-')
    phone: string;

    @IsString()
    @IsOptional()
    password: string;
}