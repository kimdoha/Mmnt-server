"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const pins_module_1 = require("./pins/pins.module");
const moments_module_1 = require("./moments/moments.module");
const user_entity_1 = require("./users/user.entity");
const pin_entity_1 = require("./pins/pin.entity");
const moment_entity_1 = require("./moments/moment.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MASTER_DB_HOST,
                database: process.env.NODE_ENV === 'prod' ? process.env.PROD_NAME : process.env.DEV_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                port: 3306,
                synchronize: process.env.NODE_ENV !== 'prod',
                entities: [user_entity_1.User, pin_entity_1.Pin, moment_entity_1.Moment],
            }),
            users_module_1.UsersModule,
            pins_module_1.PinsModule,
            moments_module_1.MomentsModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map