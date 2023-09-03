import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  // step 3: connect user entity with user module (this will automatically create user repository) to use in relevent services
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    AuthService,
    UsersService,
    CurrentUserInterceptor, // controller level interceptor
    // {
    //   provide: APP_INTERCEPTOR, // global level interceptor
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UsersModule {}
