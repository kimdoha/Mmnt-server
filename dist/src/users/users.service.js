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
    constructor(cacheManager, userRepository, pinRepository, momentRepository, jwtService, connection) {
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.pinRepository = pinRepository;
        this.momentRepository = momentRepository;
        this.jwtService = jwtService;
        this.connection = connection;
    }
    async createUser(email, password) {
        try {
            const user = await this.userRepository.findOneBy({ email });
            if (user) {
                throw new common_1.BadRequestException('중복된 이메일입니다.');
            }
            const hashedPassword = await (0, create_hashed_password_1.createHashedPassword)(password);
            const new_user = await this.userRepository.create({ email, password: hashedPassword });
            const { userIdx } = await this.userRepository.save(new_user);
            await this.userRepository.update(userIdx, { nickname: `${userIdx}번째 익명이` });
            return { userIdx, email };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Database Error');
        }
    }
    async signIn(email, password) {
        try {
            const payload = await this.validateUser(email, password);
            return await this.login(payload);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Database Error');
        }
    }
    async updateUserInfo(userIdx, attrs) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        if (attrs === null || attrs === void 0 ? void 0 : attrs.password) {
            Object.assign(attrs, { password: await (0, create_hashed_password_1.createHashedPassword)(attrs.password) });
        }
        Object.assign(user, attrs);
        return await this.userRepository.save(user);
    }
    async updateUserLocation(userIdx, location, radius) {
        const user = await this.findActiveUserByUserIdx(userIdx);
        await this.userRepository.update(userIdx, location);
        const pinLists = await this.pinRepository.createQueryBuilder()
            .select(['pin_idx, pin_x, pin_y'])
            .where(`ST_DWithin(
            ST_GeomFromText(:point, 4326),
            ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 )
            , :limit, false)`)
            .setParameters({
            point: `POINT(${location.locationX} ${location.locationY})`,
            limit: `${radius}`
        })
            .getRawMany();
        console.log(pinLists);
        if (!pinLists.length) {
            throw new common_1.NotFoundException('근처 핀을 찾을 수 없습니다.');
        }
        let pins = [], moments = [];
        pinLists.map(pin => pins.push(pin.pin_idx));
        const momentIdxLists = await this.momentRepository.createQueryBuilder('moment')
            .select(['MAX(moment_idx) AS moment_idx '])
            .where('moment.pin_idx in (:...pins)', { pins })
            .groupBy('moment.pin_idx')
            .getRawMany();
        console.log(momentIdxLists);
        await momentIdxLists.map(moment => moments.push(parseInt(moment.moment_idx)));
        console.log(moments);
        const momentLists = await this.momentRepository.createQueryBuilder('moment')
            .select([`moment_idx, moment.pin_idx, 
                title, youtube_url, music, artist,
               (ST_DistanceSphere(
                ST_GeomFromText(:point, 4326),
                ST_GeomFromText('POINT(' || pin_x || ' ' || pin_y  || ')', 4326 ) )) as distance`])
            .leftJoin(pin_entity_1.Pin, "pin", "pin.pin_idx = moment.pin_idx")
            .whereInIds(moments)
            .orderBy('distance')
            .limit(50)
            .setParameters({
            point: `POINT(${location.locationX} ${location.locationY})`,
        })
            .getRawMany();
        return [
            { pinLists },
            { 'mainMoment': momentLists[0] ? momentLists[0] : {} },
            { 'momentLists': momentLists[1] ? momentLists.slice(1, momentLists.length) : [] }
        ];
    }
    async getDetailUserInfo(userIdx) {
        const user = await this.userRepository.createQueryBuilder()
            .select(['user_idx, email, nickname, profile_url'])
            .where({ userIdx })
            .getRawOne();
        const moment = await this.momentRepository.createQueryBuilder()
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
        const user = await this.userRepository.findOneBy({ userIdx });
        if (!user) {
            throw new common_1.NotFoundException('해당 유저가 존재하지 않습니다.');
        }
        return user;
    }
    async findActiveUserByEmail(email) {
        const user = await this.userRepository.findOneBy({ email });
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
        return {
            id: user.userIdx,
            email
        };
    }
    async login(payload) {
        try {
            const { id, email } = payload;
            return {
                userIdx: id,
                accessToken: await this.jwtService.signAsync(payload)
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Database Error');
        }
    }
    async deleteUser(userIdx) {
        try {
            return await this.userRepository.delete({ userIdx });
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Database Error');
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(pin_entity_1.Pin)),
    __param(3, (0, typeorm_2.InjectRepository)(moment_entity_1.Moment)),
    __metadata("design:paramtypes", [Object, typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService,
        typeorm_1.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map