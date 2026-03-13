'use server';

import { commentService } from '@/shared/server/services/comment.service';

export const deleteCommentAction = async (commentId: string) => {
  await commentService.deleteComment(commentId);
};
