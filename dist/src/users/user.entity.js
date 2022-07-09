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
const pin_entity_1 = require("../pins/pin.entity");
let User = class User {
    logInsert() {
        console.log('Inserted User with id', this.userIdx);
    }
    logUpdate() {
        console.log('Updated User with id', this.userIdx);
    }
    logRemove() {
        console.log('Removed User with id', this.userIdx);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", unsigned: true, comment: "유저 아이디" }),
    __metadata("design:type", Number)
], User.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: '유저 이메일' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, comment: '유저 비밀번호' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, comment: '유저 닉네임' }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: '유저 프로필 이미지' }),
    __metadata("design:type", String)
], User.prototype, "profileImgUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true, comment: '유저 경도' }),
    __metadata("design:type", typeorm_1.Double)
], User.prototype, "location_x", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true, comment: '유저 위도' }),
    __metadata("design:type", typeorm_1.Double)
], User.prototype, "location_y", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, default: 0, comment: '소셜 로그인' }),
    __metadata("design:type", String)
], User.prototype, "snsRoute", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, default: 'Y', comment: '알림 여부' }),
    __metadata("design:type", String)
], User.prototype, "alarm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, default: 'N', comment: '삭제 여부' }),
    __metadata("design:type", String)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => pin_entity_1.Pin, (pin) => pin.userIdx, { eager: false }),
    __metadata("design:type", Array)
], User.prototype, "pins", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "logInsert", null);
__decorate([
    (0, typeorm_1.AfterUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "logUpdate", null);
__decorate([
    (0, typeorm_1.AfterRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "logRemove", null);
User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map