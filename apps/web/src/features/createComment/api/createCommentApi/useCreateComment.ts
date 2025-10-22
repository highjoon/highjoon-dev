import { useCallback } from 'react';

import { createCommentAction } from '@/features/createComment/api/createCommentApi/createCommentAction';
import { CreateCommentRequestDto } from '@/features/createComment/api/createCommentApi/dto';

export const useCreateComment = () => {
  const createComment = useCallback(async (params: CreateCommentRequestDto) => {
    return await createCommentAction(params);
  }, []);

  return { createComment };
};
