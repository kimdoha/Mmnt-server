import { Module } from '@nestjs/common';
import { PinModule } from 'src/pin/pin.module';
import { UserModule } from 'src/user/user.module';
import { MomentController } from './moment.controller';
import { MomentService } from './moment.service';

@Module({
  imports: [UserModule, PinModule],
  controllers: [MomentController],
  providers: [MomentService]
})
export class MomentModule {}
