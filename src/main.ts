import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  initSwagger(app);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const port = process.env.NODE_ENV === 'prod' ? 3000 : 3001;
  await app.listen(port);
  console.info(`${process.env.NODE_ENV} - Server Start At http://localhost:${port}`);
}
bootstrap();
