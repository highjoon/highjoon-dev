'use client';

import React from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { Comment } from '@highjoon-dev/prisma';
import { CiEdit, CiTrash } from 'react-icons/ci';

import { useDeleteComment } from '@/hooks/api/useDeleteComment';
import { useSignIn } from '@/hooks/useSignIn';
import { decodeToken } from '@/utils/decodeToken';

type Props = {
  commentId: Comment['id'];
  isEditMode: boolean;
  creatorId: Comment['userId'];
  refetch: () => void;
  toggleEditMode: (isEditMode: boolean) => void;
};

const CommentOptions = ({ commentId, isEditMode, creatorId, refetch, toggleEditMode }: Props) => {
  const { isSignedIn, accessToken } = useSignIn();
  const { deleteComment } = useDeleteComment();

  const isSameUser = accessToken ? decodeToken(accessToken).userId === creatorId : false;

  const handleDeleteComment = async () => {
    await deleteComment(commentId);
    refetch();
  };

  return (
    <Group justify="flex-end">
      <Group gap="xs">
        {isSameUser && (
          <>
            <ActionIcon size="lg" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiEdit size="100%" color="var(--mantine-color-blue-6)" onClick={() => toggleEditMode(!isEditMode)} />
            </ActionIcon>
            <ActionIcon size="lg" variant="subtle" color="gray" disabled={!isSignedIn}>
              <CiTrash size="100%" color="var(--mantine-color-gray-6)" onClick={handleDeleteComment} />
            </ActionIcon>
          </>
        )}
      </Group>
    </Group>
  );
};

export default CommentOptions;
