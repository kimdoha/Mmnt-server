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
exports.Moment = void 0;
const pin_entity_1 = require("../pins/pin.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
const BaseTimeEntity_1 = require("../common/BaseTimeEntity");
const reports_entity_1 = require("../reports/reports.entity");
let Moment = class Moment extends BaseTimeEntity_1.BaseTimeEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        unsigned: true,
        comment: '모먼트 아이디',
    }),
    __metadata("design:type", Number)
], Moment.prototype, "momentIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: '모먼트 제목' }),
    __metadata("design:type", String)
], Moment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60, comment: '상세 설명' }),
    __metadata("design:type", String)
], Moment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '모먼트 이미지' }),
    __metadata("design:type", String)
], Moment.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: '유튜브 링크' }),
    __metadata("design:type", String)
], Moment.prototype, "youtubeUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, comment: '곡 제목' }),
    __metadata("design:type", String)
], Moment.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: '아티스트' }),
    __metadata("design:type", String)
], Moment.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pin_entity_1.Pin, (pin) => pin.moments, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'pin_idx' }),
    __metadata("design:type", Number)
], Moment.prototype, "pinIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.moments, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_idx' }),
    __metadata("design:type", Number)
], Moment.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reports_entity_1.Report, (report) => report.momentIdx, {
        eager: false,
    }),
    __metadata("design:type", Array)
], Moment.prototype, "reports", void 0);
Moment = __decorate([
    (0, typeorm_1.Entity)('mmnt.moments')
], Moment);
exports.Moment = Moment;
//# sourceMappingURL=moment.entity.js.map