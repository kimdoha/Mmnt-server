import { Module } from '@nestjs/common';
import { MomentsService } from './moments.service';
import { MomentsController } from './moments.controller';
import { UsersModule } from 'src/users/users.module';
import { PinsModule } from 'src/pins/pins.module';

@Module({
  imports: [UsersModule, PinsModule],
  providers: [MomentsService],
  controllers: [MomentsController]
})
export class MomentsModule {}
