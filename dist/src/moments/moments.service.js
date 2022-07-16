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
const user_entity_1 = require("../users/user.entity");
const page_1 = require("../helpers/page/page");
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
    async getMyMoments(userIdx, query) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        let moments;
        const limit = page_1.Page.getLimit(query.limit);
        const offset = page_1.Page.getOffset(query.page, query.limit);
        if (query.type === 'main') {
            moments = this.repo.createQueryBuilder('users')
                .select(['users.moment_idx, users.title, users.image_url, users.updated_at'])
                .where('user_idx= :id', { id: userIdx })
                .orderBy('moment_idx', 'DESC')
                .limit(limit)
                .offset(offset)
                .getRawMany();
        }
        else if (query.type === 'detail') {
            moments = await this.repo.createQueryBuilder()
                .select(['moment_idx, title, description, image_url, youtube_url, music, artist, updated_at'])
                .addSelect(sq => {
                return sq
                    .select(['nickname'])
                    .from(user_entity_1.User, "user")
                    .where('user_idx= :id', { id: userIdx });
            })
                .where("user_idx= :id", { id: userIdx })
                .orderBy("moment_idx", "DESC")
                .limit(limit)
                .offset(offset)
                .getRawMany();
        }
        if (!moments) {
            throw new common_1.NotFoundException('등록된 모먼트가 없습니다.');
        }
        return moments;
    }
    async deleteMoment(userIdx, momentIdx, type) {
        if (type == 'moment') {
            const user = await this.usersService.findActiveUserByUserIdx(userIdx);
            const moment = await this.repo.findOneBy({ momentIdx, userIdx });
            if (!moment) {
                throw new common_1.NotFoundException('해당 모먼트는 삭제 되었거나 접근 권한이 없습니다.');
            }
            return await this.repo.delete(momentIdx);
        }
        else if (type == 'user') {
            return await this.repo.delete(userIdx);
        }
        else {
            throw new common_1.BadRequestException('삭제 경로가 올바르지 않습니다.');
        }
    }
    async deleteUserInfo(userIdx) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        await this.deleteMoment(userIdx, 0, 'user');
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