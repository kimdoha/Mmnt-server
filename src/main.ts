import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig, swaggerCustomOptions } from './app.swagger';
import { MmntLoger } from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new MmntLoger(),
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document, swaggerCustomOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = process.env.NODE_ENV === 'prod' ? 3000 : 3001;
  await app.listen(port);
  console.info(
    `${process.env.NODE_ENV} - Server Start At http://localhost:${port}`,
  );
}
bootstrap();
