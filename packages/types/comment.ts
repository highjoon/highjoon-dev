import { Comment } from "@highjoon-dev/prisma";

export type CommentWithUser = Comment & {
  user: {
    name: string;
    id: string;
    avatarUrl: string;
    homeUrl: string;
  };
  depth?: number; // 댓글의 계층 깊이 (0: 최상위 댓글, 1: 대댓글, 2: 대대댓글, ...)
};
