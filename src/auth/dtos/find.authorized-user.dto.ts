import { 
    IsString, 
    Length,
    NotContains
} from 'class-validator';

export class FindAuthorizedUserDto {

    @IsString()
    @Length(8, 15)
    @NotContains('-')
    phone: string;

    @IsString()
    @Length(6)
    value: string;
}