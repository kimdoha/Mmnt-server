import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from '../users/strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ConfigService } from '@nestjs/config';
import { cacheConfig } from 'src/configs/cache.config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { sqsConfig } from 'src/configs/sqs.config';
import { SqsService } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.registerAsync(cacheConfig),
    SqsModule.register(sqsConfig),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
