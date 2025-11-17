'use client';

import React from 'react';
import { CommentWithUser } from '@highjoon-dev/types';
import { Badge } from '@highjoon-dev/ui/components/Badge';
import { Separator } from '@highjoon-dev/ui/components/Separator';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';

import Comment from '@/entities/comment/ui/Comment';

interface Props {
  comments: CommentWithUser[];
  postId: string;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export default function Comments({ comments, postId, isLoading, refetch }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-6" />
        </div>
        <Separator />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-32 h-3" />
              </div>
            </div>
            <Skeleton className="w-full h-12" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{(comments?.length || 0).toLocaleString('ko-KR')}개의 댓글</Badge>
      </div>
      <Separator />
      <div className="space-y-4">
        {comments?.map((comment) => <Comment key={comment.id} comment={comment} postId={postId} refetch={refetch} />)}
      </div>
    </div>
  );
}
