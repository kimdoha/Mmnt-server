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
exports.UpdateUserInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateUserInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 이메일(선택 사항)',
        maxLength: 50,
    }),
    __metadata("design:type", String)
], UpdateUserInfo.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 비밀번호(선택 사항)',
        pattern: '[A-Za-z\\d!@#$%^&*()]{10,30}',
    }),
    __metadata("design:type", String)
], UpdateUserInfo.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '유저 닉네임(선택 사항)',
        maxLength: 45,
    }),
    __metadata("design:type", String)
], UpdateUserInfo.prototype, "nickname", void 0);
exports.UpdateUserInfo = UpdateUserInfo;
//# sourceMappingURL=update-userInfo.dto.js.map