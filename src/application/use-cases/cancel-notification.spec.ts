import { NotificationNotFound } from './errors/notifications-not-found';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notifications';
import { makeNotification } from '@test/factories/notification-factory';


describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const cancelNotification = new CancelNotification(notificationsRepository);

       const notification = makeNotification();

       await notificationsRepository.create(notification);
       
     await cancelNotification.execute({
        notificationId: notification.id,
       });

       expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('shoud not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const cancelNotification = new CancelNotification(notificationsRepository);
       expect(() => {
        return cancelNotification.execute({
            notificationId: 'fake-notification-id',
           });
       }).rejects.toThrow(NotificationNotFound)
    })
});