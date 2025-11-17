'use client';

import React from 'react';
import { Post } from '@highjoon-dev/prisma';

import { useGetComments } from '@/entities/comment/api/getCommentsApi/useGetComments';
import Comments from '@/entities/comment/ui/Comments';
import CommentInput from '@/features/createComment/ui/CommentInput';

interface Props {
  postId: Post['id'];
}

export default function CommentSection({ postId }: Props) {
  const { comments, isLoading, refetch } = useGetComments(postId);

  return (
    <div className="flex flex-col w-full gap-8">
      <CommentInput postId={postId} refetch={refetch} />
      <Comments postId={postId} comments={comments} isLoading={isLoading} refetch={refetch} />
    </div>
  );
}
