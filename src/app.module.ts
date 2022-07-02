import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PinsModule } from './pins/pins.module';
import { MomentsModule } from './moments/moments.module';

import { User } from './users/user.entity';
import { Pin } from './pins/pin.entity';
import { Moment } from './moments/moment.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User, Pin, Moment],
    synchronize: true,
  
  }),
    UsersModule, 
    PinsModule, 
    MomentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
