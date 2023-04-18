import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MomentsModule } from '../moments/moments.module';
import { Report } from './reports.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), UsersModule, MomentsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
