"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moments_service_1 = require("./moments.service");
const moments_controller_1 = require("./moments.controller");
const users_module_1 = require("../users/users.module");
const pins_module_1 = require("../pins/pins.module");
const moment_entity_1 = require("./moment.entity");
const nestjs_form_data_1 = require("nestjs-form-data");
let MomentsModule = class MomentsModule {
};
MomentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([moment_entity_1.Moment]),
            nestjs_form_data_1.NestjsFormDataModule.config({ storage: nestjs_form_data_1.MemoryStoredFile }),
            users_module_1.UsersModule,
            pins_module_1.PinsModule,
        ],
        controllers: [moments_controller_1.MomentsController],
        providers: [
            moments_service_1.MomentsService,
        ],
        exports: [moments_service_1.MomentsService]
    })
], MomentsModule);
exports.MomentsModule = MomentsModule;
//# sourceMappingURL=moments.module.js.map