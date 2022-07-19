"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = exports.swaggerCustomOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
const swaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
};
exports.swaggerCustomOptions = swaggerCustomOptions;
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('MMNT_API')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    in: 'header',
}, 'Authorization')
    .setDescription('MMNT API 명세서 입니다!')
    .build();
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swagger.config.js.map