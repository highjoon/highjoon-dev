import { useCallback } from 'react';

import { createReplyAction } from '@/features/createReply/api/createReplyApi/createReplyAction';
import { CreateReplyRequestDto } from '@/features/createReply/api/createReplyApi/dto';

export const useCreateReply = () => {
  const createReply = useCallback(async (params: CreateReplyRequestDto) => {
    return await createReplyAction(params);
  }, []);

  return { createReply };
};
