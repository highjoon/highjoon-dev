import { useCallback, useEffect, useState } from 'react';
import { CommentWithUser } from '@highjoon-dev/types';

import { commentApi } from '@/apis/comment';
import { clientApi } from '@/shared/api';

export const useGetComments = (postId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const fetchComments = useCallback(async () => {
    const response = await commentApi(clientApi).get({ postId });
    setComments(response.data || []);
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
