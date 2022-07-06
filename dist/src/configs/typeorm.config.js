"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
require('dotenv/config');
const path_1 = require("path");
exports.typeORMConfig = {
    type: 'mysql',
    host: process.env.MASTER_DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'prod' ? process.env.PROD_NAME : process.env.DEV_NAME,
    entities: [(0, path_1.join)(__dirname, '../**/*entity{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map