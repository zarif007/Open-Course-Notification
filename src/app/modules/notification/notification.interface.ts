// import { CategoryType } from '@prisma/client';

// type ICategory = {
//   id: number;
//   type: CategoryType;
//   icon: string;
//   notification: INotification[];
// };

type INotification = {
  id: number;
  initiator: {
    name: string;
    image: string;
  };
  receiver: string;
  link: string;
  text?: string | null;
  isRead: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export default INotification;
