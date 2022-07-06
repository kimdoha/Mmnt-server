import { 
    IsEmail,
    IsString, 
    Length,
} from 'class-validator';

export class FindAuthorizedUserDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(6)
    value: string;
}