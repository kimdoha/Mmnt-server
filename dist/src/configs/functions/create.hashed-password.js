"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashedPassword = void 0;
const bcrypt = require("bcrypt");
async function createHashedPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
exports.createHashedPassword = createHashedPassword;
//# sourceMappingURL=create.hashed-password.js.map