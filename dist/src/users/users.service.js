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
const bcrypt_1 = require("bcrypt");
const create_hashed_password_1 = require("../configs/functions/create.hashed-password");
let UsersService = class UsersService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async createUser(email, password) {
        const user = await this.findOneByEmail(email);
        if (user.userIdx) {
            throw new common_1.BadRequestException('중복된 이메일입니다.');
        }
        const hashedPassword = await (0, create_hashed_password_1.createHashedPassword)(password);
        const new_user = await this.repo.create({ email, password: hashedPassword });
        const { userIdx } = await this.repo.save(new_user);
        await this.repo.update(userIdx, { nickname: `${userIdx}번째 익명이` });
        return { userIdx, email };
    }
    async signIn(email, password) {
        const user = await this.findOneByEmail(email);
        const hashedPassword = await (0, create_hashed_password_1.createHashedPassword)(password);
        if (!user || (!(0, bcrypt_1.compare)(hashedPassword, password))) {
            throw new common_1.UnauthorizedException('유저 정보가 올바르지 않습니다.');
        }
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);
        return { userIdx: user.userIdx, accessToken };
    }
    async findOne(userIdx) {
        return await this.repo.findOneBy({ userIdx });
    }
    async findOneByEmail(email) {
        return await this.repo.createQueryBuilder()
            .select('userIdx, password')
            .where({ email })
            .andWhere('isDeleted= :YN', { YN: 'N' })
            .getRawOne();
    }
    async update(userIdx, attrs) {
        const user = await this.findOne(userIdx);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(userIdx) {
        const user = await this.findOne(userIdx);
        if (!user) {
            throw new common_1.NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map