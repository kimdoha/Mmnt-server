import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfo {
  @ApiProperty({
    description: '유저 이메일(선택 사항)',
    maxLength: 50,
  })
  email: string;

  @ApiProperty({
    description: '유저 비밀번호(선택 사항)',
    pattern: '[A-Za-z\\d!@#$%^&*()]{10,30}',
  })
  password: string;

  @ApiProperty({
    description: '유저 닉네임(선택 사항)',
    maxLength: 45,
  })
  nickname: string;
}
