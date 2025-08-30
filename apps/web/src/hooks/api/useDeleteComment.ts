import { useCallback } from 'react';
import { Comment } from '@highjoon-dev/prisma';

import { deleteCommentAction } from '@/actions/comment';

export const useDeleteComment = () => {
  const deleteComment = useCallback(async (commentId: Comment['id']) => {
    const response = await deleteCommentAction(commentId);

    return response?.data;
  }, []);

  return { deleteComment };
};
