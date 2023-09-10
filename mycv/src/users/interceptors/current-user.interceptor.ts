// Purpose of this interceptor is to run before any handler (method in controller)
// We check the request if user id is there in the session, then we retrieve user using id
// and store user object into reuqest object
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    const user = await this.usersService.findOne(userId);
    request.currentUser = user;

    return next.handle();
  }
}
