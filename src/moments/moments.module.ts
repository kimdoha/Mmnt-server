import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentsService } from './moments.service';
import { MomentsController } from './moments.controller';
import { UsersModule } from 'src/users/users.module';
import { PinsModule } from 'src/pins/pins.module';
import { Moment } from './moment.entity';
import { UploadsService } from 'src/uploads/uploads.service';
import { UploadsModule } from 'src/uploads/uploads.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moment]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    UsersModule, 
    PinsModule,
  ],
  providers: [
    MomentsService,
  ],
  controllers: [MomentsController]
})
export class MomentsModule {}
