import prisma from '../../../shared/prisma';
import INotification from './notification.interface';

const insertIntoDB = async (data: INotification): Promise<INotification> => {
  const result = await prisma.notification.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (userId: string): Promise<INotification[]> => {
  const result = await prisma.notification.findMany({
    where: {
      receiver: {
        has: userId,
      },
      isRead: false,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const makeAllRead = async (userId: string) => {
  await prisma.notification.updateMany({
    where: {
      receiver: {
        has: userId,
      },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const NotificationService = {
  insertIntoDB,
  getAllFromDB,
  makeAllRead,
};
