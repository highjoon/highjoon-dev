'use client';

import React from 'react';
import { Post } from '@highjoon-dev/prisma';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Card, CardContent } from '@highjoon-dev/ui/components/Card';
import { Skeleton } from '@highjoon-dev/ui/components/Skeleton';
import { Textarea } from '@highjoon-dev/ui/components/Textarea';

import { useSignIn } from '@/features/auth/model/useSignIn';
import RequiredSignIn from '@/features/auth/ui/RequiredSignIn';
import SignOutButton from '@/features/auth/ui/SignOutButton';
import { useCommentInput } from '@/features/createComment/model/useCommentInput';

interface Props {
  postId: Post['id'];
  refetch: () => void;
}

export default function CommentInput({ postId, refetch }: Props) {
  const { isSignedIn } = useSignIn();
  const { comment, handleChangeComment, submitComment } = useCommentInput(postId);

  const handleSubmit = async () => {
    await submitComment();
    refetch();
  };

  // 로딩 상태 처리
  if (isSignedIn === undefined) {
    return (
      <Card className="w-full p-3">
        <CardContent className="flex flex-col gap-3 p-0">
          <Skeleton className="h-[100px] w-full" />
          <div className="flex items-center justify-between">
            <div className="w-20" />
            <Button disabled>등록</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isSignedIn === false) {
    return <RequiredSignIn />;
  }

  return (
    <Card className="w-full p-3">
      <CardContent className="flex flex-col gap-3 p-0">
        <Textarea
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={handleChangeComment}
          className="min-h-[100px]"
          disabled={!isSignedIn}
        />
        <div className="flex items-center justify-between">
          {isSignedIn && <SignOutButton />}
          <Button onClick={handleSubmit} disabled={!comment || !isSignedIn}>
            등록
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
