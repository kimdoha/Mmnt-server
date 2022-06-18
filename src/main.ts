import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NODE_ENV === 'prod' ? 3000 : 3001;
  await app.listen(port);
}
bootstrap();
