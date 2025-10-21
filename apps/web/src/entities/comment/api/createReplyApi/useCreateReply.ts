import { useCallback } from 'react';

import { createReplyAction } from '@/entities/comment/api/createReplyApi/createReplyAction';
import { CreateReplyRequestDto } from '@/entities/comment/api/createReplyApi/dto';

export const useCreateReply = () => {
  const createReply = useCallback(async (params: CreateReplyRequestDto) => {
    return await createReplyAction(params);
  }, []);

  return { createReply };
};
