export declare class Page<T> {
    pageSize: number;
    totalCount: number;
    totalPage: number;
    items: T[];
    constructor(totalCount: number, pageSize: number, items: T[]);
}
