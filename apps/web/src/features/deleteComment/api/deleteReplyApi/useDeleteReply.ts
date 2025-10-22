import { useCallback } from 'react';

import { deleteReplyAction } from '@/features/deleteComment/api/deleteReplyApi/deleteReplyAction';
import { DeleteReplyRequestDto } from '@/features/deleteComment/api/deleteReplyApi/dto';

export const useDeleteReply = () => {
  const deleteReply = useCallback(async (params: DeleteReplyRequestDto) => {
    return await deleteReplyAction(params);
  }, []);

  return { deleteReply };
};
