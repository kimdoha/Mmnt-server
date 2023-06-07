import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MmntLoger } from './common/logger/logger';

@Controller()
export class AppController {
  private readonly logger = new MmntLoger(AppController.name);
  
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): void {
  //   this.logger.warn("Logging ... ");
  // }
}
