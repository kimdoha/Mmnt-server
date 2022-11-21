export class SuccessReponse<T> {
  private isSuccess: boolean;

  private code: number;

  private message: string;

  private result: T;

  constructor(code: number, message: string, result?: T) {
    this.isSuccess = true;
    this.code = code;
    this.message = message;
    this.result = result;
  }
}
