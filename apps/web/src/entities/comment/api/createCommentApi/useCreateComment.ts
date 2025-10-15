import { useCallback } from 'react';

import { createCommentAction } from '@/entities/comment/api/createCommentApi/createCommentAction';
import { CreateCommentRequestDto } from '@/entities/comment/api/createCommentApi/dto';

export const useCreateComment = () => {
  const createComment = useCallback(async (params: CreateCommentRequestDto) => {
    return await createCommentAction(params);
  }, []);

  return { createComment };
};
