import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserInfo {
  @ApiProperty({
    description: '유저 이메일(선택 사항)',
    maxLength: 50,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '유저 비밀번호(선택 사항)',
    pattern: '[A-Za-z\\d!@#$%^&*()]{10,30}',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    description: '유저 닉네임(선택 사항)',
    maxLength: 45,
  })
  @IsOptional()
  @IsString()
  nickname: string;
}
