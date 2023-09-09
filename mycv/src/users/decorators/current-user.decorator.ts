// Created custom decorator, the purpose of the decorator is to retrive current user object from request object and send it as User object
// Note: We retrieve user using user id and manually set the user object into request object in "current-user.interceptor.ts"
// Runs and return user only when @CurrentUser decorator is called. see whoAmI method in user.controller.ts
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
