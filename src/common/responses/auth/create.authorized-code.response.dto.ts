import { Expose } from 'class-transformer';

export class CreateAuthorizedCodeResponseDto {
  @Expose()
  email: string;

  @Expose()
  value: string;
}
