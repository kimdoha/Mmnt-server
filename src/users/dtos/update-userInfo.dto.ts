import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserInfo {

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  nickname: string;
}
