"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const jwt_config_1 = require("../configs/jwt.config");
const user_entity_1 = require("./user.entity");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const moment_entity_1 = require("../moments/moment.entity");
const pin_entity_1 = require("../pins/pin.entity");
const cache_config_1 = require("../configs/cache.config");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, pin_entity_1.Pin, moment_entity_1.Moment]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync(jwt_config_1.jwtConfig),
            common_1.CacheModule.registerAsync(cache_config_1.cacheConfig),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, jwt_strategy_1.JwtStrategy],
        exports: [users_service_1.UsersService, jwt_strategy_1.JwtStrategy, passport_1.PassportModule, jwt_1.JwtModule],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map