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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentsService = void 0;
const common_1 = require("@nestjs/common");
const pins_service_1 = require("../pins/pins.service");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const moment_entity_1 = require("./moment.entity");
let MomentsService = class MomentsService {
    constructor(repo, pinsService, usersService, connection) {
        this.repo = repo;
        this.pinsService = pinsService;
        this.usersService = usersService;
        this.connection = connection;
    }
    async createMoment(userIdx, body) {
        var _a;
        const { pinX, pinY } = body, momentInfo = __rest(body, ["pinX", "pinY"]);
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { pinIdx } = await this.pinsService.createPin(userIdx, pinX, pinY);
            const moment = await this.repo.create(Object.assign({ userIdx, pinIdx }, momentInfo));
            return await this.repo.save(moment);
        }
        catch (e) {
            await queryRunner.rollbackTransaction();
            throw new common_1.ConflictException((_a = e.response) === null || _a === void 0 ? void 0 : _a.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMomentDetailInfo(momentIdx) {
        const moment = await this.repo.findOneBy({ momentIdx });
        if (!moment) {
            throw new common_1.NotFoundException('삭제된 모먼트 입니다.');
        }
        return moment;
    }
};
MomentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(moment_entity_1.Moment)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        pins_service_1.PinsService,
        users_service_1.UsersService,
        typeorm_1.Connection])
], MomentsService);
exports.MomentsService = MomentsService;
//# sourceMappingURL=moments.service.js.map