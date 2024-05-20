import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

import { UserResponseDto } from '../../users/dtos/users.response.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) =>
        plainToClass(UserResponseDto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
