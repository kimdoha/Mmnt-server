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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const pin_entity_1 = require("../pins/pin.entity");
const moment_entity_1 = require("../moments/moment.entity");
const create_hashed_password_1 = require("../configs/functions/create.hashed-password");
const change_case_1 = require("change-case");
let UsersService = class UsersService {
    constructor(repo, pinRepo, momentRepo, jwtService) {
        this.repo = repo;
        this.pinRepo = pinRepo;
        this.momentRepo = momentRepo;
        this.jwtService = jwtService;
    }
    async createUser(email, password) {
        const user = await this.repo.findOneBy({ email });
        if (user) {
            throw new common_1.BadRequestException('중복된 이메일입니다.');
        }
        const hashedPassword = await (0, create_hashed_password_1.createHashedPassword)(password);
        const profileUrl = 'https://mmntuploads.s3.ap-northeast-2.amazonaws.com/1657956807175version%3Dprofile.png';
        const new_user = await this.repo.create({ email, password: hashedPassword, profileUrl });
        const { userIdx } = await this.repo.save(new_user);
        await this.repo.update(userIdx, { nickname: `${userIdx}번째 익명이` });
        return { userIdx, email };
    }
    async signIn(email, password) {
        const payload = await this.validateUser(email, password);
        return await this.login(payload);
    }
    async updateUserInfo(userIdx, attrs) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        if (attrs === null || attrs === void 0 ? void 0 : attrs.password) {
            Object.assign(attrs, { password: await (0, create_hashed_password_1.createHashedPassword)(attrs.password) });
        }
        Object.assign(user, attrs);
        return await this.repo.save(user);
    }
    async updateUserLocation(userIdx, location) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        return await this.repo.update(userIdx, location);
    }
    async getDetailUserInfo(userIdx) {
        const user = await this.repo.createQueryBuilder()
            .select(['user_idx, email, nickname, profile_url'])
            .where({ userIdx })
            .getRawOne();
        const moment = await this.momentRepo.createQueryBuilder()
            .select(['count(distinct pin_idx) as fin_count, count(moment_idx) as moment_count'])
            .where({ userIdx })
            .getRawOne();
        if (!user) {
            throw new common_1.NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        let newProfileInfo = {};
        for (let prop in Object.assign(user, moment)) {
            newProfileInfo[(0, change_case_1.camelCase)(prop)] = user[prop];
        }
        return newProfileInfo;
    }
    async findActiveUserByUserIdx(userIdx) {
        const user = await this.repo.findOneBy({ userIdx });
        if (!user) {
            throw new common_1.NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        return user;
    }
    async findActiveUserByEmail(email) {
        const user = await this.repo.findOneBy({ email });
        if (!user) {
            throw new common_1.NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        return user;
    }
    async validateUser(email, password) {
        const user = await this.findActiveUserByEmail(email);
        if (!(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }
        return { id: user.userIdx, email };
    }
    async login(payload) {
        const { id, email } = payload;
        return {
            userIdx: id,
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
    async deleteUser(userIdx) {
        return await this.repo.delete({ userIdx });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(pin_entity_1.Pin)),
    __param(2, (0, typeorm_2.InjectRepository)(moment_entity_1.Moment)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map