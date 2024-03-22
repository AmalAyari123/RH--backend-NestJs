import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {TypeOrmModule} from '@Nestjs/typeorm';
import { UsersController } from './user.controller';
import { EmailModule } from 'src/mailer/mailer.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    EmailModule
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController]
})
export class UsersModule {}
