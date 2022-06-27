import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';

@Module({
  imports: [UserModule],
  controllers: [PinController],
  providers: [PinService],
  exports: [PinService]
})
export class PinModule {}
