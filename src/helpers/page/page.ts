export class Page {

    static getOffset(page: number, limit: number): number {
        return (page - 1) * limit;
    }

    static getLimit(limit: number): number { 
        return limit;
    }

    static getPage(page: number): number {
        return page;
    }
}