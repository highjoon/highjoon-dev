import React, { useState } from 'react';
import { Button, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Comment } from '@highjoon-dev/prisma';

import { useUpdateComment } from '@/hooks/api/useUpdateComment';

type Props = {
  commentId: Comment['id'];
  content: Comment['content'];
  onUpdate: () => void;
  refetch: () => Promise<void>;
};

export default function CommentEditArea({ commentId, content, onUpdate, refetch }: Props) {
  const [editContent, setEditContent] = useState(content);
  const [isLoading, setIsLoading] = useState(false);

  const { updateComment } = useUpdateComment();

  const handleUpdateComment = async () => {
    const trimmedContent = editContent.trim();

    if (!trimmedContent) {
      return;
    }

    setIsLoading(true);

    try {
      await updateComment(commentId, trimmedContent);
      await refetch();
      onUpdate();
    } catch {
      notifications.show({
        title: '오류가 발생했습니다.',
        message: '댓글을 수정하는 중 오류가 발생했습니다.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Textarea
      value={editContent}
      onChange={(e) => setEditContent(e.currentTarget.value)}
      pl={54}
      py="sm"
      rightSection={
        <Button
          variant="default"
          size="sm"
          onClick={handleUpdateComment}
          disabled={!editContent.trim() || isLoading}
          loading={isLoading}>
          확인
        </Button>
      }
      rightSectionWidth={100}
    />
  );
}
