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
exports.Report = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
const moment_entity_1 = require("./moment.entity");
let Report = class Report {
    logInsert() {
        console.log('Inserted Report with id', this.reportIdx);
    }
    logRemove() {
        console.log('Removed Report with id', this.reportIdx);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        unsigned: true,
        comment: '신고 아이디',
    }),
    __metadata("design:type", Number)
], Report.prototype, "reportIdx", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, comment: '신고 이유' }),
    __metadata("design:type", String)
], Report.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => moment_entity_1.Moment, (moment) => moment.reports, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'moment_idx' }),
    __metadata("design:type", Number)
], Report.prototype, "momentIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reports, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_idx' }),
    __metadata("design:type", Number)
], Report.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reports, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'received_user_idx' }),
    __metadata("design:type", Number)
], Report.prototype, "receivedUserIdx", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Report.prototype, "logInsert", null);
__decorate([
    (0, typeorm_1.AfterRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Report.prototype, "logRemove", null);
Report = __decorate([
    (0, typeorm_1.Entity)('mmnt.reports')
], Report);
exports.Report = Report;
//# sourceMappingURL=report.entity.js.map