import { useCallback } from 'react';

import { UpdateReplyRequestDto } from '@/entities/comment/api/updateReplyApi/dto';
import { updateReplyAction } from '@/entities/comment/api/updateReplyApi/updateReplyAction';

export const useUpdateReply = () => {
  const updateReply = useCallback(async (params: UpdateReplyRequestDto) => {
    return await updateReplyAction(params);
  }, []);

  return { updateReply };
};
