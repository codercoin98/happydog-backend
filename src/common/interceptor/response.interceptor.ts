import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
interface Data<T> {
  data: T;
}
export class RespnseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<Data<T>> | Promise<Observable<Data<T>>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          success: true
        };
      })
    );
  }
}
