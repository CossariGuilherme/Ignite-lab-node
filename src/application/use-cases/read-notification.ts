import { NotificationNotFound } from './errors/notifications-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

interface ReadNotificationRequest {
    notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if(!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    }
}