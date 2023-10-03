import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const { email, password } = ctx.req.body.variables;

    const user: User = await this.userService.findUserByEmail(email);

    if (user && user.password === password) {
      ctx.user = user;
      return true;
    }

    throw new HttpException('UnAuthenticated', HttpStatus.UNAUTHORIZED);
  }
}
