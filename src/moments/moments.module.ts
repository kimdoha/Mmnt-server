import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentsService } from './moments.service';
import { MomentsController } from './moments.controller';
import { UsersModule } from 'src/users/users.module';
import { PinsModule } from 'src/pins/pins.module';
import { Moment } from './moment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moment]),
    UsersModule, 
    PinsModule
  ],
  providers: [MomentsService],
  controllers: [MomentsController]
})
export class MomentsModule {}
