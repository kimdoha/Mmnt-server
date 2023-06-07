import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  password: string;
}
