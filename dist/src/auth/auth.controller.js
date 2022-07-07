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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const http_status_codes_1 = require("http-status-codes");
const SuccessReponse_1 = require("../helpers/SuccessReponse");
const serialize_interceptor_1 = require("../common/interceptors/serialize.interceptor");
const auth_service_1 = require("./auth.service");
const create_authorized_code_dto_1 = require("./dtos/create.authorized-code.dto");
const create_authorized_code_response_dto_1 = require("../common/responses/auth/create.authorized-code.response.dto");
const find_authorized_user_dto_1 = require("./dtos/find.authorized-user.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async certificateUser(body, res) {
        const responseData = await this.authService.createAuthorizedCode(body.email);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '인증 번호 발송 성공', responseData));
    }
    async validate(query, res) {
        await this.authService.verifyAuthorizedCode(query.email, query.value);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '인증 확인 성공'));
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, serialize_interceptor_1.Serialize)(create_authorized_code_response_dto_1.CreateAuthorizedCodeResponseDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_authorized_code_dto_1.CreateAuthorizedCodeDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "certificateUser", null);
__decorate([
    (0, common_1.Get)('/verification'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_authorized_user_dto_1.FindAuthorizedUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validate", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map