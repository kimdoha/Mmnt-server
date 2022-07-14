"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
class Page {
    static getOffset(page, limit) {
        return (page - 1) * limit;
    }
    static getLimit(limit) {
        return limit;
    }
    static getPage(page) {
        return page;
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map