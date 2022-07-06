

require('dotenv/config');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeORMConfig: TypeOrmModuleOptions = {
      type: 'mysql',
      host: process.env.MASTER_DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'prod' ? process.env.PROD_NAME : process.env.DEV_NAME,
      entities: [join(__dirname, '../**/*entity{.ts,.js}')],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
};    


// type: 'sqlite',
// database: 'db.sqlite',
// entities: [User, Pin, Moment],
// synchronize: true,