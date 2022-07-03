"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const user_entity_1 = require("../users/user.entity");
const pin_entity_1 = require("../pins/pin.entity");
const moment_entity_1 = require("../moments/moment.entity");
exports.typeORMConfig = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [user_entity_1.User, pin_entity_1.Pin, moment_entity_1.Moment],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map