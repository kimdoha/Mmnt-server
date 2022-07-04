export class ErrorResponse {
    private isSuccess: boolean;
    private code: number;
    private message: string | string[];

    constructor(code: number, message?: string | string[]){
        this.isSuccess = false;
        this.code = code;
        this.message = message;
    }
}