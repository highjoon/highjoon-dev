import { useCallback, useEffect, useState } from 'react';
import { CommentWithUser } from '@highjoon-dev/types';

import { getCommentsApi } from '@/apis/comment';

export const useGetComments = (postId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentWithUser[]>([]);

  const fetchComments = useCallback(async () => {
    const response = await getCommentsApi(postId);
    setComments(response || []);
  }, [postId]);

  const refetchComments = useCallback(() => {
    fetchComments();
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
