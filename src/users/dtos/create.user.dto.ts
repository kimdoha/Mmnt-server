import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    maxLength: 50,
    description: '유저 이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    pattern: '[A-Za-z\\d!@#$%^&*()]{10,30}',
    description: '유저 비밀번호',
  })
  @IsString()
  password: string;
}
