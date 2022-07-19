import { SwaggerCustomOptions } from '@nestjs/swagger';
declare const swaggerCustomOptions: SwaggerCustomOptions;
declare const swaggerConfig: Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
export { swaggerCustomOptions, swaggerConfig };
