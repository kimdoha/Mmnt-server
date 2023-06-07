import { IsString, Matches } from 'class-validator';
import { PageRequest } from 'src/helpers/page/page.request';

export class GetHistoryRequest extends PageRequest {
  constructor() {
    super();
  }

  @IsString()
  @Matches('main|detail')
  type: string;
}
