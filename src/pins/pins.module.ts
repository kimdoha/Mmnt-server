import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';

@Module({
  imports: [UsersModule],
  controllers: [PinsController],
  providers: [PinsService],
  exports: [PinsService]
})
export class PinsModule {}
