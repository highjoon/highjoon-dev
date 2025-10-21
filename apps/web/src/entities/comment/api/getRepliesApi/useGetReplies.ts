import { useCallback } from 'react';

import { GetRepliesRequestDto } from '@/entities/comment/api/getRepliesApi/dto';
import { getRepliesAction } from '@/entities/comment/api/getRepliesApi/getRepliesAction';

export const useGetReplies = () => {
  const getReplies = useCallback(async (params: GetRepliesRequestDto) => {
    return await getRepliesAction(params);
  }, []);

  return { getReplies };
};
