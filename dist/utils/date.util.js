"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const common_1 = require("@nestjs/common");
const js_joda_1 = require("js-joda");
class DateUtil {
    static toLocalDate(date) {
        if (!date) {
            throw new common_1.BadRequestException('date 가 정의 되지 않았습니다.');
        }
        return js_joda_1.LocalDate.from((0, js_joda_1.nativeJs)(date));
    }
    static toLocalDateTime(date) {
        if (!date) {
            throw new common_1.BadRequestException('date 가 정의 되지 않았습니다.');
        }
        return js_joda_1.LocalDateTime.from((0, js_joda_1.nativeJs)(date));
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map