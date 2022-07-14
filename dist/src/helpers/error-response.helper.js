"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(code, message) {
        this.isSuccess = false;
        this.code = code;
        this.message = message;
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error-response.helper.js.map