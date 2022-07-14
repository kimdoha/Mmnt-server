export declare class SuccessReponse<T> {
    private isSuccess;
    private code;
    private message;
    private result;
    constructor(code: number, message: string, result?: T);
}
