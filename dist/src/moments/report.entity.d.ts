export declare class Report {
    reportIdx: number;
    reason: string;
    createdAt: Date;
    momentIdx: number;
    userIdx: number;
    receivedUserIdx: number;
    logInsert(): void;
    logRemove(): void;
}
