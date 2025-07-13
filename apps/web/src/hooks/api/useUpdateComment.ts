import { useCallback } from 'react';
import { Comment } from '@highjoon-dev/prisma';

import { updateCommentAction } from '@/actions/comment';

export const useUpdateComment = () => {
  const updateComment = useCallback(async (commentId: Comment['id'], content: Comment['content']) => {
    const response = await updateCommentAction(commentId, content);

    return response?.responseObject;
  }, []);

  return { updateComment };
};
