import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

const swaggerConfig = new DocumentBuilder()
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

export { swaggerCustomOptions, swaggerConfig };
