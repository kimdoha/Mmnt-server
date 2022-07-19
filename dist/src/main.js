"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const app_swagger_1 = require("./app.swagger");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const document = swagger_1.SwaggerModule.createDocument(app, app_swagger_1.swaggerConfig);
    swagger_1.SwaggerModule.setup('/docs', app, document, app_swagger_1.swaggerCustomOptions);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const port = process.env.NODE_ENV === 'prod' ? 3000 : 3001;
    await app.listen(port);
    console.info(`${process.env.NODE_ENV} - Server Start At http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map