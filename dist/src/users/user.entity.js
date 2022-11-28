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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const moment_entity_1 = require("../moments/moment.entity");
const BaseTimeEntity_1 = require("../common/BaseTimeEntity");
const reports_entity_1 = require("../reports/reports.entity");
let User = class User extends BaseTimeEntity_1.BaseTimeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        unsigned: true,
        comment: '유저 아이디',
    }),
    __metadata("design:type", Number)
], User.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: '유저 이메일',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        comment: '유저 비밀번호',
    }),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        comment: '유저 닉네임',
    }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: '유저 프로필 이미지',
    }),
    __metadata("design:type", String)
], User.prototype, "profileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
        comment: '유저 경도',
    }),
    __metadata("design:type", Number)
], User.prototype, "locationX", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
        comment: '유저 위도',
    }),
    __metadata("design:type", Number)
], User.prototype, "locationY", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'char',
        length: 1,
        default: 0,
        comment: '소셜 로그인',
    }),
    __metadata("design:type", String)
], User.prototype, "snsRoute", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'char',
        length: 1,
        default: 'Y',
        comment: '알림 여부',
    }),
    __metadata("design:type", String)
], User.prototype, "alarm", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => moment_entity_1.Moment, (moment) => moment.userIdx, {
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "moments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reports_entity_1.Report, (report) => report.reportUserIdx, {
        eager: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
User = __decorate([
    (0, typeorm_1.Entity)('mmnt.users')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map