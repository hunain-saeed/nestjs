import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from '../auth/jwt.guard';
import { RoleGuard, Roles } from '../auth/role.guard';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  
  @Query((returns) => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  securedResourceAdmin(): string {
    return 'this is secured data for ADMIN';
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard)
  securedResource(): string {
    return 'this is secured data';
  }

  @Query((returns) => String)
  @UseGuards(AuthGuard)
  login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return jwt.sign(payload, 'key', { expiresIn: '60s' });
  }

  @Query((returns) => String)
  async signup(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Args({ name: 'role', type: () => String }) role: string,
  ): Promise<string> {
    const user = await this.userService.create(name, email, password, role);
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return jwt.sign(payload, 'key', { expiresIn: '60s' });
  }
}
