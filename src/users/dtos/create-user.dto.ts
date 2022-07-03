import { doesNotMatch } from 'assert';
import { 
    isNotIn,
    IsOptional, 
    IsString, 
    Length,
    NotContains,
    notContains
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