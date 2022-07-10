import { 
    DocumentBuilder, 
    SwaggerModule 
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';


export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
    .setTitle('MMNT_API')
    .addBearerAuth()
    .setDescription('MMNT API 명세서 입니다!')
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
}
