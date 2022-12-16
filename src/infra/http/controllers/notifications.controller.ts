import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CountRecipientsNotifications } from '@application/use-cases/count-recipient-notifications';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { CancelNotification } from '@application/use-cases/cancel-notifications';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { SendNotification } from '@application/use-cases/send-notification';
import { Body, Controller, Patch, Post, Param, Get } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
constructor(
  private sendNotification: SendNotification,
  private cancelNotification: CancelNotification,
  private readNotification: ReadNotification,
  private unreadNotification: UnreadNotification,
  private countRecipientsNotifications: CountRecipientsNotifications,
  private getRecipientNotification: GetRecipientNotifications,
  ) {}

@Patch(':id/cancel')
 async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
 }

 @Get('count/from/:recipientId')
 async countFromRecipient(@Param('recipientId') recipientId: string) {
  const { count } = await this.countRecipientsNotifications.execute({
    recipientId,
  });
  return{
    count,
  }
 }

 @Get('from/:recipientId')
 async getFromRecipient(@Param('recipientId') recipientId: string){
  const { notifications } = await this.getRecipientNotification.execute({
    recipientId,
  });
  return{
    notifications: notifications.map(NotificationViewModel.toHTTP),
  }
 }

 @Patch(':id/read')
 async read(@Param('id') id: string) {
  await this.readNotification.execute({
    notificationId: id,
  });
}

@Patch(':id/unread')
async unread(@Param('id') id: string) {
 await this.unreadNotification.execute({
   notificationId: id,
 });
}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
    recipientId,
    content,
    category,
    });

    return {
       notification: NotificationViewModel.toHTTP(notification),
       };
  }
}
