import { Module, forwardRef } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationToken } from './entities/notification-token.entity';
import { UsersModule } from 'src/auth/User.module';
import { UserService } from 'src/auth/user.service';
import { UserRepository } from 'src/auth/UserRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationToken  , UserRepository]) , 
    forwardRef(() => UsersModule)

  ],
  controllers: [NotificationsController],
  providers: [NotificationsService , UserRepository],
  exports: [TypeOrmModule]
})

export class NotificationModule {}