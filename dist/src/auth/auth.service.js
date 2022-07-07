"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const create_authorized_code_1 = require("../configs/functions/create.authorized-code");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.default();
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async createAuthorizedCode(email) {
        const value = await (0, create_authorized_code_1.createAuthorizedCode)();
        await redis.set(email, value);
        await redis.expire(email, 300);
        return { email, value };
    }
    async verifyAuthorizedCode(email, value) {
        const exist = await redis.exists(email);
        if (!exist) {
            throw new common_1.NotFoundException('인증 번호가 만료 되었습니다.');
        }
        const code = await redis.get(email);
        if (value != code) {
            throw new common_1.ConflictException('인증 번호가 올바르지 않습니다.');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map