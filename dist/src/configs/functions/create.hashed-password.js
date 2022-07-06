"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashedPassword = void 0;
const crypto = require("crypto");
async function createHashedPassword(password) {
    return await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");
}
exports.createHashedPassword = createHashedPassword;
//# sourceMappingURL=create.hashed-password.js.map