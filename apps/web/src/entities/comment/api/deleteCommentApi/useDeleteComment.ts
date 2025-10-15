import { useCallback } from 'react';
import { Comment } from '@highjoon-dev/prisma';

import { deleteCommentAction } from '@/entities/comment/api/deleteCommentApi/deleteCommentAction';

export const useDeleteComment = () => {
  const deleteComment = useCallback(async (commentId: Comment['id']) => {
    await deleteCommentAction(commentId);
  }, []);

  return { deleteComment };
};
