'use client';

import React from 'react';
import { ActionIcon, Button, Flex, Group } from '@mantine/core';
import { Comment } from '@highjoon-dev/prisma';
import { CiEdit, CiTrash } from 'react-icons/ci';

import { createReplyApi } from '@/apis/comment';
import ReplyInput from '@/components/comments/ReplyInput';
import { useDeleteComment } from '@/hooks/api/useDeleteComment';
import { useSignIn } from '@/hooks/useSignIn';
import { decodeToken } from '@/utils/decodeToken';

type Props = {
  commentId: Comment['id'];
  postId: string;
  isEditMode: boolean;
  creatorId: Comment['userId'];
  refetch: () => void;
  toggleEditMode: (isEditMode: boolean) => void;
  onReplyCreated?: () => Promise<void>;
  isReply?: boolean;
  parentCommentId?: string;
};

const CommentOptions = ({
  commentId,
  postId,
  isEditMode,
  creatorId,
  refetch,
  toggleEditMode,
  onReplyCreated,
  isReply = false,
  parentCommentId,
}: Props) => {
  const { isSignedIn, accessToken } = useSignIn();
  const { deleteComment } = useDeleteComment();
  const [isReplyMode, setIsReplyMode] = React.useState(false);

  const isSameUser = accessToken ? decodeToken(accessToken).userId === creatorId : false;

  const handleSubmitReply = async (content: string) => {
    if (!accessToken) return;

    const userId = decodeToken(accessToken).userId;

    // 대댓글에 답글을 다는 경우, 최상위 댓글의 ID를 parentId로 사용
    const actualParentId = isReply && parentCommentId ? parentCommentId : commentId;

    console.log(postId, userId, content, actualParentId);
    await createReplyApi(postId, userId, content, actualParentId);

    // 대댓글 생성 후 콜백 함수 호출
    if (onReplyCreated) {
      await onReplyCreated();
    }

    refetch();
    setIsReplyMode(false);
  };

  const handleDeleteComment = async () => {
    await deleteComment(commentId);
    refetch();
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <Group justify="flex-end">
      <Group w="100%" gap="xs" justify="space-between">
        <Button size="xs" variant="default" onClick={() => setIsReplyMode((v) => !v)}>
          답글달기
        </Button>
        {isSameUser && (
          <Flex gap="xs">
            <ActionIcon size="md" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiEdit size="100%" color="var(--mantine-color-blue-6)" onClick={() => toggleEditMode(!isEditMode)} />
            </ActionIcon>
            <ActionIcon size="md" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiTrash size="100%" color="var(--mantine-color-gray-6)" onClick={handleDeleteComment} />
            </ActionIcon>
          </Flex>
        )}
      </Group>
      {isReplyMode && <ReplyInput onSubmit={handleSubmitReply} onCancel={() => setIsReplyMode(false)} />}
    </Group>
  );
};

export default CommentOptions;
