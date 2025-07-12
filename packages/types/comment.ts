import { Comment } from "@highjoon-dev/prisma";

export type CommentWithUser = Comment & {
  user: {
    name: string;
    id: string;
    avatarUrl: string;
    homeUrl: string;
  };
};
