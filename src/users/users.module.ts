import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { jwtConfig } from 'src/configs/jwt.config';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig),
    
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtStrategy,
  ],
  exports: [UsersService]
})
export class UsersModule {}
