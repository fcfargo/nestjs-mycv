import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log('before');
    const code = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => {
        // Run something before the response is sent out
        console.log('after');
        return {
          code,
          message: 'success',
          body: data,
        };
      }),
    );
  }
}
