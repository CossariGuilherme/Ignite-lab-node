import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifications-repository';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from './prisma/prisma.service';
import { Module } from "@nestjs/common";

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: PrismaNotificationRepository,
        }
    ],
    exports: [NotificationsRepository],
})
export class DatabaseModule {}