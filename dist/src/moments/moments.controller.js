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
exports.MomentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_status_codes_1 = require("http-status-codes");
const get_user_decorator_1 = require("../common/decorators/get.user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const success_reponse_helper_1 = require("../helpers/success-reponse.helper");
const create_moment_dto_1 = require("./dtos/create-moment.dto");
const get_history_request_dto_1 = require("./dtos/get-history-request.dto");
const moments_service_1 = require("./moments.service");
let MomentsController = class MomentsController {
    constructor(momentsService) {
        this.momentsService = momentsService;
    }
    async createMoment(user, body, res) {
        const responseData = await this.momentsService.createMoment(user.userIdx, body);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    }
    async getMyMomentHistory(user, query, res) {
        const responseData = await this.momentsService.getMyMoments(user.userIdx, query);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, `나의 모먼트 피드 조회 성공`, responseData));
    }
    async deleteMoment(user, momentIdx, res) {
        await this.momentsService.deleteMoment(user.userIdx, momentIdx, 'moment');
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, `모먼트 삭제 성공`));
    }
    async deleteUserInfo(user, res) {
        await this.momentsService.deleteUserInfo(user.userIdx);
        return res.json(new success_reponse_helper_1.SuccessReponse(http_status_codes_1.StatusCodes.OK, '유저 삭제 성공'));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '핀 및 모먼트 생성 API',
        description: '이미지 파일은 "이미지 URL 생성 API"로 변환 후 URL 을 입력해주시면 됩니다.'
    }),
    (0, swagger_1.ApiBody)({ type: create_moment_dto_1.CreateMomentDto }),
    (0, swagger_1.ApiCreatedResponse)({ status: 201, description: '핀 및 모먼트 생성 성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다.' }),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_moment_dto_1.CreateMomentDto, Object]),
    __metadata("design:returntype", Promise)
], MomentsController.prototype, "createMoment", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '나의 모먼트 히스토리 조회 API',
        description: `[type] main : 나의 모먼트 피드 전체 조회,  detail : 나의 모먼트 상세 조회 </br>
         [page] page 는 1부터 시작합니다.`
    }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '나의 모먼트 피드 조회 성공' }),
    (0, swagger_1.ApiBadRequestResponse)({ status: 400, description: 'type, page, limit 이 올바르지 않습니다.' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 유저가 존재하지 않습니다. | 등록된 모먼트가 없습니다.' }),
    (0, common_1.Get)('/my-history'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_history_request_dto_1.GetHistoryRequest, Object]),
    __metadata("design:returntype", Promise)
], MomentsController.prototype, "getMyMomentHistory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모먼트 삭제 API' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '모먼트 삭제 성공' }),
    (0, swagger_1.ApiNotFoundResponse)({ status: 404, description: '해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.' }),
    (0, common_1.Delete)('/:momentIdx'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('momentIdx')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], MomentsController.prototype, "deleteMoment", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiOperation)({ summary: '유저 삭제 API' }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '유저 삭제 성공' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MomentsController.prototype, "deleteUserInfo", null);
MomentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
    (0, swagger_1.ApiTags)('moment'),
    (0, common_1.Controller)('moment'),
    __metadata("design:paramtypes", [moments_service_1.MomentsService])
], MomentsController);
exports.MomentsController = MomentsController;
//# sourceMappingURL=moments.controller.js.map