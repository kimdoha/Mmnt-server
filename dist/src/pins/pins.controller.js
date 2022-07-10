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
exports.PinsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pins_service_1 = require("./pins.service");
let PinsController = class PinsController {
    constructor(pinsService) {
        this.pinsService = pinsService;
    }
    async createPin(userIdx, pin_x, pin_y) {
        return await this.pinsService.createPin(userIdx, pin_x, pin_y);
    }
};
PinsController = __decorate([
    (0, swagger_1.ApiTags)('pin'),
    (0, common_1.Controller)('pins'),
    __metadata("design:paramtypes", [pins_service_1.PinsService])
], PinsController);
exports.PinsController = PinsController;
//# sourceMappingURL=pins.controller.js.map