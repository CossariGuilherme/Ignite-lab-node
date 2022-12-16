import { UnreadNotification } from '@application/use-cases/unread-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { CancelNotification } from '@application/use-cases/cancel-notifications';
import { NotificationsController } from './controllers/notifications.controller';
import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CountRecipientsNotifications } from '@application/use-cases/count-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientsNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}