// import { IDiscussion } from '../../../interfaces/discussion.interface';
import prisma from '../../../shared/prisma';

const getFromDB = async () => {
  const result = await prisma.discussion.findMany({});

  return result;
};

const insertIntoDB = async (data: any) => {
  if (!data) return null;

  const result = await prisma.discussion.create({
    data,
  });

  // eslint-disable-next-line no-console
  console.log(data);

  return result;
};

export const DiscussionService = {
  insertIntoDB,
  getFromDB,
};
