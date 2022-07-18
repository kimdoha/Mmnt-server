import { 
    DocumentBuilder, 
    SwaggerCustomOptions, 
    SwaggerModule 
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
    .setTitle('MMNT_API')
    .addBearerAuth( {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'Authorization',)
    .setDescription('MMNT API 명세서 입니다!')
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document, swaggerCustomOptions);
}
