import { NotificationNotFound } from './errors/notifications-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from './unread-notification';


describe('Unread notification', () => {
    it('should be able to Unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const unreadNotification = new UnreadNotification(notificationsRepository);

       const notification = makeNotification({
        readAt: new Date(),
       });

       await notificationsRepository.create(notification);
       
     await unreadNotification.execute({
        notificationId: notification.id,
       });

       expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('shoud not be able to Unread a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const unreadNotification = new UnreadNotification(notificationsRepository);
       expect(() => {
        return unreadNotification.execute({
            notificationId: 'fake-notification-id',
           });
       }).rejects.toThrow(NotificationNotFound)
    })
});