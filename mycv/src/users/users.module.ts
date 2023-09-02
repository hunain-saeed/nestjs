import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  // step 3: connect user entity with user module (this will automatically create user repository) to use in relevent services
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
})
export class UsersModule {}
