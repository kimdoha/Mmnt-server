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
import { PinsService } from 'src/pins/pins.service';
import { Report } from './report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Moment, Report]),
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    UsersModule,
    PinsModule,
  ],
  controllers: [MomentsController],
  providers: [MomentsService],
  exports: [MomentsService],
})
export class MomentsModule {}
