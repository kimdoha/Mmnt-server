import { Page } from './page';
export declare class PaginationHelper<T> {
    getPaginationItems<T>(count: number, limit: number, items: T[]): Page<T>;
}
