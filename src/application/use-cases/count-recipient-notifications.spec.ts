import { CountRecipientsNotifications } from './count-recipient-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';


describe('Count recipient notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const countRecipientsNotifications = new CountRecipientsNotifications(notificationsRepository);

       await notificationsRepository.create(makeNotification({recipientId: 'example-recipient-id'}));

       await notificationsRepository.create(makeNotification({recipientId: 'example-recipient-id'}));

       await notificationsRepository.create(makeNotification({recipientId: 'example2-recipient-id'}));
       
    const { count } = await countRecipientsNotifications.execute({
        recipientId: 'example-recipient-id'
       });

       expect(count).toEqual(2);
    });
});