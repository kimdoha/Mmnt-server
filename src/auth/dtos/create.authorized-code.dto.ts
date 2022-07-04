import { 
    IsOptional, 
    IsString, 
    Length,
    NotContains
} from 'class-validator'

export class CreateAuthorizedCodeDto {
    
    @IsString()
    @Length(8, 15)
    @NotContains('-')
    phone: string;

    @IsString()
    @IsOptional()
    password: string;
}