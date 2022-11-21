import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { cacheConfig } from 'src/configs/cache.config';
import { Pin } from './pin.entity';
import { PinsService } from './pins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pin]),
    UsersModule,
    CacheModule.registerAsync(cacheConfig),
  ],
  providers: [PinsService],
  exports: [PinsService],
})
export class PinsModule {}
