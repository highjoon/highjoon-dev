import { Comment } from '@highjoon-dev/prisma';

export interface CommentApiRequest {
  get: { postId: Comment['postId'] };
  create: { postId: Comment['postId']; userId: Comment['userId']; content: Comment['content'] };
  update: { commentId: Comment['id']; content: Comment['content'] };
  delete: { commentId: Comment['id'] };
  getReplies: { parentId: Comment['id'] };
  createReply: {
    postId: Comment['postId'];
    userId: Comment['userId'];
    content: Comment['content'];
    parentId: Comment['id'];
  };
  updateReply: { replyId: Comment['id']; content: Comment['content'] };
  deleteReply: { replyId: Comment['id'] };
}
