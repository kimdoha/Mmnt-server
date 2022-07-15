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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const create_authorized_code_1 = require("../configs/functions/create.authorized-code");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const nestjs_sqs_1 = require("@ssut/nestjs-sqs");
const QUEUE = process.env.QUEUE_NAME;
let AuthService = class AuthService {
    constructor(cacheManager, userService, jwtService, sqsService) {
        this.cacheManager = cacheManager;
        this.userService = userService;
        this.jwtService = jwtService;
        this.sqsService = sqsService;
    }
    async createAuthorizedCode(email) {
        const value = await (0, create_authorized_code_1.createAuthorizedCode)();
        await this.cacheManager.set(email, value, { ttl: 180 });
        const content = { email, value };
        const message = {
            id: `id`,
            body: content,
        };
        await this.sqsService.send(QUEUE, message);
        return content;
    }
    async verifyAuthorizedCode(email, value) {
        const code = await this.cacheManager.get(email);
        if (value != code) {
            throw new common_1.NotFoundException('인증 번호가 올바르지 않습니다.');
        }
        return { email, value };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        jwt_1.JwtService,
        nestjs_sqs_1.SqsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map