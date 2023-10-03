import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    const user: User = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  create(name: string, email: string, password: string, role: string) {
    const user = this.userRepo.create({ name, email, password, role });

    return this.userRepo.save(user);
  }
}
