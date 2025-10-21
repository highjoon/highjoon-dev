import { ChangeEvent, useCallback, useState } from 'react';
import { Post } from '@highjoon-dev/prisma';

import { useSignIn } from '@/entities/auth/lib/useSignIn';
import { createCommentAction } from '@/entities/comment/api/createCommentApi/createCommentAction';
import { decodeToken } from '@/shared/lib/decodeToken';

export const useCommentInput = (postId: Post['id']) => {
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
    await createCommentAction({ postId, userId, content: comment });
    setComment('');
  }, [accessToken, comment, isSignedIn, postId, signIn]);

  return {
    comment,
    handleChangeComment,
    submitComment,
  };
};
