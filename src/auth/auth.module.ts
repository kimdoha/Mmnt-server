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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.registerAsync(cacheConfig),
    UsersModule, 
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
  ],
  exports: [AuthService]
})
export class AuthModule {}
