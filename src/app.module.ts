import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PinsModule } from './pins/pins.module';
import { MomentsModule } from './moments/moments.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule, 
    PinsModule, 
    MomentsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
