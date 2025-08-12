import React, { useState } from 'react';
import { Anchor, Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import CommentEditArea from '@/components/comments/CommentEditArea';
import CommentOptions from '@/components/comments/CommentOptions';

import styles from './Comment.module.scss';

type Props = {
  reply: CommentWithUser;
  postId: string;
  parentCommentId: string;
  refetch: () => Promise<void>;
  onReplyUpdated?: () => Promise<void>;
};

const Reply = ({ reply, postId, parentCommentId, refetch, onReplyUpdated }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRefetch = async () => {
    await refetch();
    if (onReplyUpdated) {
      await onReplyUpdated();
    }
  };

  return (
    <Paper withBorder radius="md" p="sm" ml="xl" mt="xs">
      <Anchor href={reply.user.homeUrl!} target="_blank" display="flex" w="fit-content">
        <Group>
          <Avatar src={reply.user.avatarUrl} alt={reply.user.name} radius="xl" size="sm" />
          <Box>
            <Text size="xs">{reply.user.name}</Text>
            <Text size="xs" c="dimmed">
              {dayjs(reply.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Box>
        </Group>
      </Anchor>
      {isEditMode ? (
        <CommentEditArea
          commentId={reply.id}
          content={reply.content}
          onUpdate={() => setIsEditMode(false)}
          refetch={handleRefetch}
        />
      ) : (
        <Text className={styles.root} pl={42} py="xs" size="xs">
          {reply.content}
        </Text>
      )}

      <CommentOptions
        commentId={reply.id}
        postId={postId}
        creatorId={reply.userId}
        isEditMode={isEditMode}
        refetch={handleRefetch}
        toggleEditMode={setIsEditMode}
        onReplyCreated={onReplyUpdated}
        isReply={true}
        parentCommentId={parentCommentId}
      />
    </Paper>
  );
};

export default Reply;
