import { useCallback } from 'react';

import { UpdateCommentRequestDto } from '@/entities/comment/api/updateCommentApi/dto';
import { updateCommentAction } from '@/entities/comment/api/updateCommentApi/updateCommentAction';

export const useUpdateComment = () => {
  const updateComment = useCallback(async (params: UpdateCommentRequestDto) => {
    await updateCommentAction(params);
  }, []);

  return { updateComment };
};
