import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Pin } from './pin.entity';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';
import { cacheConfig } from 'src/configs/cache.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pin]), 
    UsersModule,
    CacheModule.registerAsync(cacheConfig),
  ],
  controllers: [PinsController],
  providers: [PinsService],
  exports: [PinsService]
})
export class PinsModule {}
