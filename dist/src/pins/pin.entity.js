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
const openapi = require("@nestjs/swagger");
const moment_entity_1 = require("../moments/moment.entity");
const typeorm_1 = require("typeorm");
const BaseTimeEntity_1 = require("../common/BaseTimeEntity");
let Pin = class Pin extends BaseTimeEntity_1.BaseTimeEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { pinIdx: { required: true, type: () => Number }, pinX: { required: true, type: () => Number }, pinY: { required: true, type: () => Number }, moments: { required: true, type: () => [require("../moments/moment.entity").Moment] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        unsigned: true,
        comment: '핀 아이디',
    }),
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
    (0, typeorm_1.OneToMany)((type) => moment_entity_1.Moment, (moment) => moment.pinIdx, {
        eager: false,
    }),
    __metadata("design:type", Array)
], Pin.prototype, "moments", void 0);
Pin = __decorate([
    (0, typeorm_1.Entity)('mmnt.pins')
], Pin);
exports.Pin = Pin;
//# sourceMappingURL=pin.entity.js.map