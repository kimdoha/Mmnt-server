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
const function_1 = require("../configs/function");
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.default();
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async createAuthorizedCode(phone) {
        const value = await (0, function_1.createAuthorizedCode)();
        await redis.set(phone, value);
        await redis.expire(phone, 120);
        return { phone, value };
    }
    async verifyAuthorizedCode(phone, value) {
        const exist = await redis.exists(phone);
        if (!exist) {
            throw new common_1.NotFoundException('인증 번호가 만료 되었습니다.');
        }
        const code = await redis.get(phone);
        if (value != code) {
            throw new common_1.ConflictException('인증 번호가 올바르지 않습니다.');
        }
    }
    async create(phone, password) {
        const user = this.repo.create({ phone, password });
        return this.repo.save(user);
    }
    findOne(userIdx) {
        return this.repo.findOneBy({ userIdx });
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
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map