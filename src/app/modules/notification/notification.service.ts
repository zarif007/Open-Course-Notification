import prisma from '../../../shared/prisma';

// const insertIntoDB = async (data: INotification): Promise<INotification> => {
// const result = await prisma.notification.create({
//   data,
//   include: {
//     category: true,
//   },
// });
// return result;
// };

const getAllFromDB = async (userId: string) => {
  const result = await prisma.notification.findMany({
    where: {
      receiver: userId,
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
      receiver: userId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const NotificationService = {
  // insertIntoDB,
  getAllFromDB,
  makeAllRead,
};
