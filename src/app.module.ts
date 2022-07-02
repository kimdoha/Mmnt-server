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
    type: 'mysql',
    host: process.env.MASTER_DB_HOST,
    database: process.env.NODE_ENV === 'prod' ? process.env.PROD_NAME : process.env.DEV_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    synchronize: process.env.NODE_ENV !== 'prod',
    entities: [User, Pin, Moment],

  }),
    UsersModule, 
    PinsModule, 
    MomentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
