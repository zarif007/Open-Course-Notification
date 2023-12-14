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

const getAllFromDB = async (): Promise<INotification[]> => {
  const result = await prisma.notification.findMany({
    include: {
      category: true,
    },
  });

  return result;
};

export const NotificationService = {
  insertIntoDB,
  getAllFromDB,
};
