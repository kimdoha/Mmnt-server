"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = exports.swaggerCustomOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
};
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('MMNT_API')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    in: 'header',
}, 'Authorization')
    .setDescription('MMNT API 명세서 입니다!')
    .build();
//# sourceMappingURL=app.swagger.js.map