import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
require('dotenv/config');

export const cacheConfig: CacheModuleOptions = {
  useFactory: async () => ({
    store: redisStore,
    host:
      process.env.NODE_ENV === 'prod'
        ? process.env.ELEASTICACHE_HOST
        : 'localhost',
    port: process.env.CACHE_PORT,
  }),
};
