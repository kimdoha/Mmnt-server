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
const create_user_dto_1 = require("./dtos/create-user.dto");
const users_service_1 = require("./users.service");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const http_status_codes_1 = require("http-status-codes");
const SuccessReponse_1 = require("../helpers/SuccessReponse");
const create_authorized_code_res_dto_1 = require("../auth/dtos/create-authorized-code-res.dto");
const find_authorized_user_dto_1 = require("../auth/dtos/find-authorized-user.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async certificateUser(body, res) {
        const responseData = await this.userService.createAuthorizedCode(body.phone);
        return res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '인증 번호 발송 성공', responseData));
    }
    async validate(query, res) {
        await this.userService.verifyAuthorizedCode(query.phone, query.value);
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '인증 확인 성공'));
    }
    createUser(body) {
        this.userService.create(body.phone, body.password);
    }
    async findUser(userIdx) {
        const user = await this.userService.findOne(userIdx);
    }
};
__decorate([
    (0, common_1.Post)(''),
    (0, serialize_interceptor_1.Serialize)(create_authorized_code_res_dto_1.CreateAuthorizedCodeResDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "certificateUser", null);
__decorate([
    (0, common_1.Get)('/verification'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_authorized_user_dto_1.FindAuthorizedUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:userIdx'),
    __param(0, (0, common_1.Param)('userIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map