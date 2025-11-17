'use client';

import React from 'react';
import { Comment } from '@highjoon-dev/prisma';
import { Button } from '@highjoon-dev/ui/components/Button';
import { AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { overlay } from 'overlay-kit';

import { useSignIn } from '@/features/auth/model/useSignIn';
import { createReplyAction } from '@/features/createReply/api/createReplyApi/createReplyAction';
import ReplyInput from '@/features/createReply/ui/ReplyInput';
import { useDeleteComment } from '@/features/deleteComment/api/deleteCommentApi/useDeleteComment';
import { deleteReplyAction } from '@/features/deleteComment/api/deleteReplyApi/deleteReplyAction';
import { decodeToken } from '@/shared/lib/decodeToken';
import ConfirmModal from '@/shared/ui/ConfirmModal';

interface Props {
  commentId: Comment['id'];
  postId: string;
  isEditMode: boolean;
  creatorId: Comment['userId'];
  refetch: () => void;
  toggleEditMode: (isEditMode: boolean) => void;
  onReplyCreated?: () => Promise<void>;
  onReplyDeleted?: () => Promise<void>;
  depth?: number;
}

export default function CommentOptions({
  commentId,
  postId,
  isEditMode,
  creatorId,
  refetch,
  toggleEditMode,
  onReplyCreated,
  onReplyDeleted,
  depth = 0,
}: Props) {
  const { isSignedIn, accessToken } = useSignIn();
  const { deleteComment } = useDeleteComment();
  const [isReplyMode, setIsReplyMode] = React.useState(false);

  const isSameUser = accessToken ? decodeToken(accessToken).userId === creatorId : false;

  const handleSubmitReply = async (content: string) => {
    if (!accessToken) return;

    const userId = decodeToken(accessToken).userId;

    const actualParentId = commentId;

    await createReplyAction({ postId, userId, content, parentId: actualParentId });

    // 대댓글 생성 후 콜백 함수 호출
    await onReplyCreated?.();

    refetch();
    setIsReplyMode(false);
  };

  const handleDeleteComment = async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <ConfirmModal
        icon={<AlertTriangle className="size-5 text-destructive" />}
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close(false);
        }}
        onConfirm={() => close(true)}
        title="댓글 삭제"
        message="정말로 이 댓글을 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        confirmColor="destructive"
      />
    ));

    if (!result) {
      return;
    }

    try {
      if (depth === 0) {
        // 최상위 댓글인 경우
        await deleteComment(commentId);
        refetch();
      } else {
        // 대댓글인 경우
        await deleteReplyAction({ replyId: commentId });
        // 대댓글 삭제 후 콜백 함수를 먼저 호출 (중첩 답글 목록 새로고침)
        await onReplyDeleted?.();
        refetch();
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between w-full gap-2">
        {/* 3단계까지만 답글 달기 허용 */}
        {depth < 3 ? (
          <Button size="sm" variant="ghost" onClick={() => setIsReplyMode((v) => !v)}>
            답글달기
          </Button>
        ) : (
          <div />
        )}
        {isSameUser && (
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" onClick={() => toggleEditMode(!isEditMode)}>
              <Edit className="mr-1 size-4" />
              수정
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleDeleteComment()}>
              <Trash2 className="mr-1 size-4" />
              삭제
            </Button>
          </div>
        )}
      </div>
      {isReplyMode && <ReplyInput onSubmit={handleSubmitReply} onCancel={() => setIsReplyMode(false)} />}
    </div>
  );
}
