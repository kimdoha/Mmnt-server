import { NestFactory } from '@nestjs/core';
import { MomentModule } from './moment/moment.module';

async function bootstrap() {
  const app = await NestFactory.create(MomentModule);
  const port = process.env.NODE_ENV === 'prod' ? 3000 : 3001;
  await app.listen(port);
}
bootstrap();
