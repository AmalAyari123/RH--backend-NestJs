import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationToken } from './entities/notification-token.entity';
import { Demande } from 'src/demande/entities/demande.entity';
import { User } from 'src/auth/user.entity';
import * as admin from 'firebase-admin';
import { UserService } from 'src/auth/user.service';




@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private readonly notificationsRepo: Repository<Notification>,
    @InjectRepository(NotificationToken) private readonly notificationTokenRepo: Repository<NotificationToken>,
   @Inject(forwardRef(() => UserService))
    private userService: UserService,
   /* private readonly userRepository: Repository<User>,*/
  ) {}


  async saveNotificationToken(userId: number, notificationToken: string, status: string): Promise<void> {
    const existingToken = await this.notificationTokenRepo.findOne({ where: { user: { id: userId } } });

    if (existingToken) {
      // Update existing token
      existingToken.notification_token = notificationToken;
      existingToken.status = status;
      await this.notificationTokenRepo.save(existingToken);
    } else {
      // Save new token
      await this.notificationTokenRepo.save({
        user: { id: userId },
        notification_token: notificationToken,
        status: status,
      });
    }
  }


  getNotifications = async (): Promise<any> => {
    return await this.notificationsRepo.find();
  };

  async sendPush(userId: number, title: string, body: string): Promise<void> {
    try {
      const user = await this.userService.findOne(userId);

      if (!user) {
        console.log(`User ${userId} does not exist`);
        return;
      }

      const activeTokens = user.notificationTokens.filter(token => token.status === 'ACTIVE');

      if (activeTokens.length === 0) {
        console.log(`No active notification tokens found for user ${userId}`);
        return;
      }

      // Create and save notification records
      const notifications = activeTokens.map(token => {
        const notification = new Notification();
        notification.notification_token = token;
        notification.title = title;
        notification.body = body;
        return notification;
      });

      await this.notificationsRepo.save(notifications);

      // Send push notifications
      for (const token of activeTokens) {
        try {
          await admin.messaging().send({
            notification: { title, body },
            token: token.notification_token,
            android: { priority: 'high' },
          });

          const notification = notifications.find(n => n.notification_token.id === token.id);
          if (notification) {
            await this.notificationsRepo.save(notification);
          }
        } catch (error) {
          console.error('Error sending push notification:', error);
          if (error.code === 'messaging/registration-token-not-registered') {
            console.log(`Token not registered. Removing invalid token for user ${userId}`);
            await this.notificationTokenRepo.remove(token);
          }
        }
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
      throw error;
    }
  }

async setTokenStatus(userId: number, status: string): Promise<void> {
  const notificationTokens = await this.notificationTokenRepo.find({
    where: { user: { id: userId } },
  });

  console.log('Fetched Tokens:', notificationTokens);

  if (notificationTokens.length > 0) {
    for (const notificationToken of notificationTokens) {
      notificationToken.status = status;
    }
    await this.notificationTokenRepo.save(notificationTokens);
    console.log('Updated Tokens:', notificationTokens);
  } else {
    throw new Error('Notification tokens not found for the specified user');
  }
}

async getNotificationsByUserId(userId: number): Promise<Notification[]> {
  const notifications = await this.notificationsRepo
    .createQueryBuilder('notification')
    .innerJoinAndSelect('notification.notification_token', 'notification_token')
    .innerJoinAndSelect('notification_token.user', 'user')
    .where('user.id = :userId', { userId })
    .getMany();

  return notifications;
}
}






  
  






