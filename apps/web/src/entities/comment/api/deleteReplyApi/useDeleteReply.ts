import { useCallback } from 'react';

import { deleteReplyAction } from '@/entities/comment/api/deleteReplyApi/deleteReplyAction';
import { DeleteReplyRequestDto } from '@/entities/comment/api/deleteReplyApi/dto';

export const useDeleteReply = () => {
  const deleteReply = useCallback(async (params: DeleteReplyRequestDto) => {
    return await deleteReplyAction(params);
  }, []);

  return { deleteReply };
};
