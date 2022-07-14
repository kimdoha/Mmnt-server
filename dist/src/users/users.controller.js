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
const success_reponse_helper_1 = require("../helpers/success-reponse.helper");
const get_user_decorator_1 = require("../common/decorators/get.user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_profile_Info_response_dto_1 = require("../common/responses/users/get.profile-Info.response.dto");
const update_location_dto_1 = require("./dtos/update-location.dto");
const swagger_1 = require("@nestjs/swagger");
const sign_up_response_dto_1 = require("../common/responses/users/sign-up.response.dto");
const sign_in_response_dto_1 = require("../common/responses/users/sign-in.response.dto");
const update_password_dto_1 = require("./dtos/update-password.dto");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(body, res) {
        const responseData = await this.userService.createUser(body.email, body.password);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '회원 가입 성공', responseData));
    }
    async signin(body, res) {
        const responseData = await this.userService.signIn(body.email, body.password);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '로그인 성공', responseData));
    }
    async updatePassword(user, body, res) {
        const responseData = await this.userService.updateUserPassword(user.userIdx, body.password);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '비밀번호 변경 성공'));
    }
    async findProfileInfo(user, res) {
        const responseData = await this.userService.getDetailUserInfo(user.userIdx);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '내 프로필 조회 성공', responseData));
    }
    async updateUserLocation(user, body, res) {
        await this.userService.updateUserLocation(user.userIdx, body);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '유저 위치 수정 성공'));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원 가입 API' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '회원 가입 성공', type: sign_up_response_dto_1.SignUpResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ status: 400, description: '중복된 이메일 외 Bad Request' }),
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인 API' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '로그인 성공', type: sign_in_response_dto_1.SignInResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ status: 401, description: '유저 정보가 올바르지 않습니다.' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다.' }),
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경 API' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '비밀번호 변경 성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다.' }),
    (0, common_1.Patch)('/password'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_password_dto_1.UpdatePassword, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: '유저 프로필 조회 API', description: '유저 핀 / 모먼트 개수 확인 가능합니다.' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '유저 프로필 조회 성공', type: get_profile_Info_response_dto_1.GetProfileInfoResponse }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다.' }),
    (0, common_1.Get)('/profile-info'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findProfileInfo", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: '유저 위치 수정 API' }),
    (0, swagger_1.ApiBody)({ type: update_location_dto_1.UpdateLocationDto }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '유저 위치 수정 성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다.' }),
    (0, common_1.Patch)('/location'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_location_dto_1.UpdateLocationDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserLocation", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map