import { useCallback } from 'react';

import { UpdateCommentRequestDto } from '@/features/editComment/api/updateCommentApi/dto';
import { updateCommentAction } from '@/features/editComment/api/updateCommentApi/updateCommentAction';

export const useUpdateComment = () => {
  const updateComment = useCallback(async (params: UpdateCommentRequestDto) => {
    await updateCommentAction(params);
  }, []);

  return { updateComment };
};
