import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, NextFunction, Request } from 'express';
import { Repository } from 'typeorm';

import { User } from '../../models/users.entity';
import { CurrentUserPayload } from '../interfaces/common.interface';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUserPayload;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (user) {
        const { id, email, admin } = user;
        const CurrentUserPayload: CurrentUserPayload = {
          id,
          email,
          admin,
        };
        req.currentUser = CurrentUserPayload;
      }
    }
    next();
  }
}
