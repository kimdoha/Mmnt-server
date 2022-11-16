import { ApiProperty } from '@nestjs/swagger';
import { PageRequest } from 'src/helpers/page/page.request';

export class getMomentsRequestDto extends PageRequest {
  constructor() {
    super();
  }
}
