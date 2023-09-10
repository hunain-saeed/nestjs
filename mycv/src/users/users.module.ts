import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

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
  // exports: [UsersService], // was exporting because wanted to use current-user.interceptor in report module as well, 
  // but since we define that functionality as global level so don't need to export it
})
export class UsersModule {
  // global level middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
