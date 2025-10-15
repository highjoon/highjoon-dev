import { useCallback, useEffect, useState } from 'react';
import { CommentWithUser } from '@highjoon-dev/types';

import { getCommentsAction } from '@/entities/comment/api/getCommentsApi/getCommentsAction';

export const useGetComments = (postId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const fetchComments = useCallback(async () => {
    const response = await getCommentsAction({ postId });
    setComments(response || []);
  }, [postId]);

  const refetchComments = useCallback(async () => {
    await fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchComments();
      setIsLoading(false);
    })();
  }, [fetchComments]);

  return { comments, isLoading, refetch: refetchComments };
};
