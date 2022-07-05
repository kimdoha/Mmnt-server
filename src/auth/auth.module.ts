import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule, 
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    // JwtStrategy,
  ],
  exports: [AuthService]
})
export class AuthModule {}
