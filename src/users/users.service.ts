import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.userRepository.create({ email, password });

    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  find(email: string) {
    return this.userRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('user not found');
    }

    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('user not found');
    }

    return this.userRepository.remove(user);
  }
}
