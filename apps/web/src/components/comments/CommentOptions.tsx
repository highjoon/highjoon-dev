'use client';

import React from 'react';
import { ActionIcon, Button, Flex, Group } from '@mantine/core';
import { Comment } from '@highjoon-dev/prisma';
import { overlay } from 'overlay-kit';
import { CiEdit, CiTrash, CiWarning } from 'react-icons/ci';

import { deleteReplyAction } from '@/actions/comment';
import { commentApi } from '@/apis/comment';
import ReplyInput from '@/components/comments/ReplyInput';
import { useDeleteComment } from '@/hooks/api/useDeleteComment';
import { useSignIn } from '@/hooks/useSignIn';
import { clientApi } from '@/shared/api';
import ConfirmModal from '@/shared/ui/ConfirmModal';
import { decodeToken } from '@/utils/decodeToken';

type Props = {
  commentId: Comment['id'];
  postId: string;
  isEditMode: boolean;
  creatorId: Comment['userId'];
  refetch: () => void;
  toggleEditMode: (isEditMode: boolean) => void;
  onReplyCreated?: () => Promise<void>;
  onReplyDeleted?: () => Promise<void>;
  depth?: number;
};

const CommentOptions = ({
  commentId,
  postId,
  isEditMode,
  creatorId,
  refetch,
  toggleEditMode,
  onReplyCreated,
  onReplyDeleted,
  depth = 0,
}: Props) => {
  const { isSignedIn, accessToken } = useSignIn();
  const { deleteComment } = useDeleteComment();
  const [isReplyMode, setIsReplyMode] = React.useState(false);

  const isSameUser = accessToken ? decodeToken(accessToken).userId === creatorId : false;

  const handleSubmitReply = async (content: string) => {
    if (!accessToken) return;

    const userId = decodeToken(accessToken).userId;

    const actualParentId = commentId;

    await commentApi(clientApi).createReply({ postId, userId, content, parentId: actualParentId });

    // 대댓글 생성 후 콜백 함수 호출
    await onReplyCreated?.();

    refetch();
    setIsReplyMode(false);
  };

  const handleDeleteComment = async () => {
    const result = await overlay.openAsync<boolean>(({ isOpen, close }) => (
      <ConfirmModal
        icon={<CiWarning size={20} color="var(--mantine-color-red-6)" />}
        opened={isOpen}
        onClose={() => close(false)}
        onConfirm={() => close(true)}
        title="댓글 삭제"
        message="정말로 이 댓글을 삭제하시겠습니까? 삭제된 댓글은 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        confirmColor="red"
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
        await deleteReplyAction(commentId);
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
    <Group justify="flex-end">
      <Group w="100%" gap="xs" justify="space-between">
        {/* 3단계까지만 답글 달기 허용 */}
        {depth < 3 ? (
          <Button size="xs" variant="default" onClick={() => setIsReplyMode((v) => !v)}>
            답글달기
          </Button>
        ) : (
          <div />
        )}
        {isSameUser && (
          <Flex gap="xs">
            <ActionIcon size="md" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiEdit size="100%" color="var(--mantine-color-blue-6)" onClick={() => toggleEditMode(!isEditMode)} />
            </ActionIcon>
            <ActionIcon size="md" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiTrash size="100%" color="var(--mantine-color-gray-6)" onClick={() => handleDeleteComment()} />
            </ActionIcon>
          </Flex>
        )}
      </Group>
      {isReplyMode && <ReplyInput onSubmit={handleSubmitReply} onCancel={() => setIsReplyMode(false)} />}
    </Group>
  );
};

export default CommentOptions;
