import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import CommentEditArea from '@/components/comments/CommentEditArea';
import CommentOptions from '@/components/comments/CommentOptions';

import styles from './Comment.module.scss';

type Props = {
  comment: CommentWithUser;
  refetch: () => Promise<void>;
};

const Comment = ({ comment, refetch }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Paper withBorder radius="md" p="md">
      <Link href={comment.user.homeUrl!} target="_blank">
        <Group>
          <Avatar src={comment.user.avatarUrl} alt={comment.user.name} radius="xl" />
          <Box>
            <Text size="sm">{comment.user.name}</Text>
            <Text size="xs" c="dimmed">
              {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Box>
        </Group>
      </Link>
      {isEditMode ? (
        <CommentEditArea
          commentId={comment.id}
          content={comment.content}
          onUpdate={() => setIsEditMode(false)}
          refetch={refetch}
        />
      ) : (
        <Text className={styles.root} pl={54} pt="sm" size="sm">
          {comment.content}
        </Text>
      )}

      <CommentOptions
        commentId={comment.id}
        creatorId={comment.userId}
        isEditMode={isEditMode}
        refetch={refetch}
        toggleEditMode={setIsEditMode}
      />
    </Paper>
  );
};

export default Comment;
