import { GetRecipientNotifications } from './get-recipient-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';


describe('Get recipient notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
       const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

       await notificationsRepository.create(makeNotification({recipientId: 'example-recipient-id'}));

       await notificationsRepository.create(makeNotification({recipientId: 'example-recipient-id'}));

       await notificationsRepository.create(makeNotification({recipientId: 'example2-recipient-id'}));
       
    const { notifications } = await getRecipientNotifications.execute({
        recipientId: 'example-recipient-id'
       });

       expect(notifications).toHaveLength(2);
       expect(notifications).toEqual(expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
    ]));
    });
});