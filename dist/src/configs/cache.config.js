"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheConfig = void 0;
const redisStore = require("cache-manager-ioredis");
exports.cacheConfig = {
    useFactory: async () => ({
        store: redisStore,
        host: process.env.NODE_ENV === 'prod'
            ? process.env.ELEASTICACHE_HOST
            : 'localhost',
        port: process.env.CACHE_PORT,
    }),
};
//# sourceMappingURL=cache.config.js.map