import { IsEmail, IsString } from 'class-validator';

export class CreateAuthorizedCodeDto {

  @IsString()
  @IsEmail()
  email: string;
}
