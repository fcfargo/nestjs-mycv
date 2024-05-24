import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from '../../models/users.entity';
import { SessionPayload } from '../interfaces/common.interface';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const { userId } = request.session || {};
    if (userId) {
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (user) {
        const { id, email } = user;
        const sessionPayload: SessionPayload = {
          id,
          email,
        };
        request.currentUser = sessionPayload;
      }
    }

    return next.handle();
  }
}
