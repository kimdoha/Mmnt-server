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
exports.Pin = void 0;
const moment_entity_1 = require("../moments/moment.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Pin = class Pin {
    logInsert() {
        console.log('Inserted User with id', this.pinIdx);
    }
    logUpdate() {
        console.log('Updated User with id', this.pinIdx);
    }
    logRemove() {
        console.log('Removed User with id', this.pinIdx);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", unsigned: true, comment: "핀 아이디" }),
    __metadata("design:type", Number)
], Pin.prototype, "pinIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, comment: '핀 경도' }),
    __metadata("design:type", Number)
], Pin.prototype, "pinX", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, comment: '핀 위도' }),
    __metadata("design:type", Number)
], Pin.prototype, "pinY", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 1, default: 'N', comment: '삭제 여부' }),
    __metadata("design:type", String)
], Pin.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Pin.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", nullable: true, default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Pin.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: "timestamp", nullable: true, }),
    __metadata("design:type", Date)
], Pin.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.pins, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_idx' }),
    __metadata("design:type", Number)
], Pin.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => moment_entity_1.Moment, (moment) => moment.pinIdx, { eager: false }),
    __metadata("design:type", Array)
], Pin.prototype, "moments", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pin.prototype, "logInsert", null);
__decorate([
    (0, typeorm_1.AfterUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pin.prototype, "logUpdate", null);
__decorate([
    (0, typeorm_1.AfterRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Pin.prototype, "logRemove", null);
Pin = __decorate([
    (0, typeorm_1.Entity)("mmnt.pins")
], Pin);
exports.Pin = Pin;
//# sourceMappingURL=pin.entity.js.map