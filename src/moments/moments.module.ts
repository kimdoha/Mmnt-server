import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PinsModule } from 'src/pins/pins.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { Moment } from './moment.entity';
import { MomentsController } from './moments.controller';
import { MomentsService } from './moments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moment]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    UsersModule,
    PinsModule,
  ],
  controllers: [MomentsController],
  providers: [MomentsService],
  exports: [MomentsService],
})
export class MomentsModule {}
