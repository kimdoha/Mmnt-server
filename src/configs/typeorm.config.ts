import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Pin } from '../pins/pin.entity';
import { Moment } from '../moments/moment.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Pin, Moment],
      synchronize: true,
};