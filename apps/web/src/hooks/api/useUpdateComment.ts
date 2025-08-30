import { useCallback } from 'react';
import { Comment } from '@highjoon-dev/prisma';

import { updateCommentAction } from '@/actions/comment';

export const useUpdateComment = () => {
  const updateComment = useCallback(async (commentId: Comment['id'], content: Comment['content']) => {
    await updateCommentAction(commentId, content);
  }, []);

  return { updateComment };
};
