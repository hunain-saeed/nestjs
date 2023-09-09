// Guard run before the interceptor, and after the middleware (cookie session is middleware)
// it just check if user id is there in session or not.
// if user session is not defined then we will return from here throw an exception

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
