import { CacheModule, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { cacheConfig } from 'src/configs/cache.config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { sqsConfig } from 'src/configs/sqs.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

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
