import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { PageRequest } from 'src/helpers/page/page.request';

export class GetHistoryRequest extends PageRequest {
  constructor() {
    super();
  }

  @ApiProperty()
  @IsString()
  @Matches('main|detail')
  type: string;
}
