'use server';

import { commentService } from '@/entities/comment/services/comment.service';

export const deleteCommentAction = async (commentId: string) => {
  await commentService.deleteComment(commentId);
};
