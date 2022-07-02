import { IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
    @IsPhoneNumber()
    phone: string;

    @IsString()
    password: string;
}