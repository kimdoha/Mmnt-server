"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMomentsRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const page_request_1 = require("../../helpers/page/page.request");
class getMomentsRequestDto extends page_request_1.PageRequest {
    constructor() {
        super();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.getMomentsRequestDto = getMomentsRequestDto;
//# sourceMappingURL=get-moments-request.dto.js.map