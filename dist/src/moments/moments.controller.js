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
const SuccessReponse_1 = require("../helpers/SuccessReponse");
const create_moment_dto_1 = require("./dtos/create-moment.dto");
const moments_service_1 = require("./moments.service");
let MomentsController = class MomentsController {
    constructor(momentsService) {
        this.momentsService = momentsService;
    }
    async createMoment(user, body, res) {
        const responseData = await this.momentsService.createMoment(user.userIdx, body);
        return res.json(new SuccessReponse_1.SuccessReponse(http_status_codes_1.StatusCodes.CREATED, '핀 및 모먼트 생성 성공', responseData));
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)('Authorization'),
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
MomentsController = __decorate([
    (0, swagger_1.ApiTags)('moment'),
    (0, common_1.Controller)('moment'),
    __metadata("design:paramtypes", [moments_service_1.MomentsService])
], MomentsController);
exports.MomentsController = MomentsController;
//# sourceMappingURL=moments.controller.js.map