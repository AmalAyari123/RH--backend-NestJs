import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

import { UserService } from 'src/auth/user.service';
import { NotificationToken } from './entities/notification-token.entity';
import { Notification } from './entities/notification.entity';



@Controller('notifications')
export class NotificationsController {
  constructor(
    
    private readonly notificationsService: NotificationsService) {}



  

    @Post('save-info')
    async saveNotificationToken(
      @Body() data: { userId: number; notificationToken: string , status:string},
    ): Promise<{ success: boolean; message?: string }> {
      try {
        await this.notificationsService.saveNotificationToken(data.userId, data.notificationToken , data.status);
        return { success: true };
      } catch (error) {
        console.error('Error saving notification token:', error);
        return { success: false, message: 'Failed to save notification token' };
      }
    }
    @Post('send-push')
    async sendPushNotification(
      @Body() data: { userId: number; title: string; body: string },
    ): Promise<{ success: boolean; message: string }> {
      console.log(`Received request to send push notification to user ${data.userId}`);
      try {
        await this.notificationsService.sendPush(data.userId, data.title, data.body);
        console.log(`Successfully sent push notification to user ${data.userId}`);
        return { success: true, message: 'Notification sent successfully' };
      } catch (error) {
        console.error(`Failed to send push notification to user ${data.userId}:`, error.message);
        return { success: false, message: 'Failed to send push notification' };
      }
    }

  @Post('set-token-status')
  async setTokenStatus(
    @Body() data: { userId: number, status: string }
  ): Promise<{ success: boolean, message: string }> {
    try {
      await this.notificationsService.setTokenStatus(data.userId,data.status);
      return { success: true, message: 'Token status updated successfully' };
    } catch (error) {
      console.error('Error updating token status:', error);
      return { success: false, message: 'Failed to update token status' };
    }
  }
  @Get(':userId')
  async getNotificationsByUserId(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Notification[]> {
    return this.notificationsService.getNotificationsByUserId(userId);
  }
}



