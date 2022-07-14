export declare abstract class PageRequest {
    page: number | 1;
    limit: number | 10;
    getOffset(): number;
    getLimit(): number;
    getPage(): number;
}
