import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { Observable, map } from 'rxjs';

@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(({ code, message, result }: any) => ({
        isSuccess: true,
        code,
        message,
        result,
      })),
    );
  }
}
