export type IDiscussion = {
  id?: number;
  comment: string;

  replies: Comment[];
  parentId?: number | null;
  parent?: Comment | null;

  createdAt: Date;
  updatedAt?: Date;
};
