"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizedCode = void 0;
async function createAuthorizedCode() {
    const feed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '0123456789';
    let result = '';
    for (let i = 0; i < 2; i++)
        result += feed[Math.floor(Math.random() * feed.length)];
    for (let i = 0; i < 2; i++)
        result += num[Math.floor(Math.random() * num.length)];
    return result;
}
exports.createAuthorizedCode = createAuthorizedCode;
//# sourceMappingURL=create.authorized-code.js.map