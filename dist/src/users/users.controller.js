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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dtos/create.user.dto");
const users_service_1 = require("./users.service");
const http_status_codes_1 = require("http-status-codes");
const SuccessReponse_1 = require("../helpers/SuccessReponse");
const get_user_decorator_1 = require("../common/decorators/get.user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(body, res) {
        const responseData = await this.userService.createUser(body.email, body.password);
        return res.json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '회원 가입 성공', responseData));
    }
    async signin(body, res) {
        const responseData = await this.userService.signIn(body.email, body.password);
        return res.json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '로그인 성공', responseData));
    }
    async findProfileInfo(user, res) {
        const responseData = await this.userService.findUserByUserIdx(user.userIdx);
        return res.json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '내 프로필 조회 성공', responseData));
    }
};
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('/profile-info'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findProfileInfo", null);
UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map