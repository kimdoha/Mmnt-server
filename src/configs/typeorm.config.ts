

require('dotenv/config');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Moment } from 'src/moments/moment.entity';
import { Pin } from 'src/pins/pin.entity';
import { User } from 'src/users/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeORMConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      host: process.env.MASTER_DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV === 'prod' ? process.env.PROD_NAME : process.env.DEV_NAME,
      entities: [join(__dirname, '../**/*entity{.ts,.js}')],
      autoLoadEntities: true,
      //entities: [User, Pin, Moment],
      synchronize: false,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
};    


// type: 'sqlite',
// database: 'db.sqlite',
// entities: [User, Pin, Moment],
// synchronize: true,