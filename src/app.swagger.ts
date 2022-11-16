import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MMNT_API')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'JWT',
      in: 'header',
    },
    'Authorization',
  )
  .setDescription('MMNT API 명세서 입니다!')
  .build();
