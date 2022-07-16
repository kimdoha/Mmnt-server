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
exports.PinsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../common/decorators/get.user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const distance_request_dto_1 = require("./dtos/distance-request.dto");
const pin_param_dto_1 = require("./dtos/pin-param.dto");
const pins_service_1 = require("./pins.service");
let PinsController = class PinsController {
    constructor(pinsService) {
        this.pinsService = pinsService;
    }
    async getPinInfo(user, param, query, res) {
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '핀 조회 API',
        description: '내 위치 변경 시, [유저 위치 수정] 후 해당 API 이용'
    }),
    (0, swagger_1.ApiOkResponse)({ status: 200, description: '핀 조회 성공' }),
    (0, common_1.Get)('/:pinIdx'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pin_param_dto_1.PinParamDto,
        distance_request_dto_1.DistanceRequestDto, Object]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "getPinInfo", null);
PinsController = __decorate([
    (0, swagger_1.ApiTags)('pin'),
    (0, common_1.Controller)('pins'),
    __metadata("design:paramtypes", [pins_service_1.PinsService])
], PinsController);
exports.PinsController = PinsController;
//# sourceMappingURL=pins.controller.js.map