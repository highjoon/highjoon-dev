import React from 'react';
import Link from 'next/link';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import styles from './Comment.module.scss';

type Props = {
  comment: CommentWithUser;
};

const Comment = ({ comment }: Props) => {
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
      <Text className={styles.root} pl={54} pt="sm" size="sm">
        {comment.content}
      </Text>
    </Paper>
  );
};

export default Comment;
