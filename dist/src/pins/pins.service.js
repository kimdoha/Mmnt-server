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
exports.PinsService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const pin_entity_1 = require("./pin.entity");
let PinsService = class PinsService {
    constructor(repo, usersService) {
        this.repo = repo;
        this.usersService = usersService;
    }
    async createPin(userIdx, pinX, pinY) {
        const user = await this.usersService.findActiveUserByUserIdx(userIdx);
        const pin = await this.repo.findOneBy({ pinX, pinY });
        if (pin) {
            return pin;
        }
        else {
            const new_pin = await this.repo.create({ pinX, pinY });
            return await this.repo.save(new_pin);
        }
    }
    async getPinInfo(userIdx, pinIdx, distance) {
        const { locationX, locationY } = await this.usersService.findActiveUserByUserIdx(userIdx);
        const { pinX, pinY } = await this.findActivePinByPinIdx(pinIdx);
        return;
    }
    async findActivePinByPinIdx(pinIdx) {
        const pin = await this.repo.findOneBy({ pinIdx });
        if (!pin) {
            throw new common_1.NotFoundException('해당 핀을 찾을 수 없습니다.');
        }
        return pin;
    }
    async deletePin(pinIdx, userIdx, type) {
    }
};
PinsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pin_entity_1.Pin)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        users_service_1.UsersService])
], PinsService);
exports.PinsService = PinsService;
//# sourceMappingURL=pins.service.js.map