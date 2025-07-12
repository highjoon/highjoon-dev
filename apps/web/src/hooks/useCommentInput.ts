import { ChangeEvent, useCallback, useState } from 'react';
import { Post } from '@highjoon-dev/prisma';

import { createComment } from '@/actions/comment';
import { useSignIn } from '@/hooks/useSignIn';
import { decodeToken } from '@/utils/decodeToken';

export const useCommentInput = (postId: Post['id'], slug: Post['slug']) => {
  const [comment, setComment] = useState('');

  const { isSignedIn, accessToken, signIn } = useSignIn();

  const handleChangeComment = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }, []);

  const submitComment = useCallback(async () => {
    if (!comment.trim()) {
      return;
    }

    if (!isSignedIn || !accessToken) {
      signIn();

      return;
    }

    const { userId } = decodeToken(accessToken);
    await createComment(postId, userId, comment, slug);
    setComment('');
  }, [accessToken, comment, isSignedIn, postId, signIn, slug]);

  return {
    comment,
    handleChangeComment,
    submitComment,
  };
};
