import React, { useCallback, useEffect, useState } from 'react';
import { Anchor, Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import { getRepliesAction } from '@/entities/comment/api/getRepliesApi/getRepliesAction';
import Reply from '@/entities/comment/ui/Reply';
import CommentEditArea from '@/features/editComment/ui/CommentEditArea';
import CommentOptions from '@/features/manageComment/ui/CommentOptions';

import styles from './Comment.module.scss';

type Props = {
  comment: CommentWithUser;
  postId: string;
  refetch: () => Promise<void>;
};

export default function Comment({ comment, postId, refetch }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [replies, setReplies] = useState<CommentWithUser[]>([]);

  const loadReplies = useCallback(async () => {
    try {
      const repliesData = await getRepliesAction({ parentId: comment.id });

      if (repliesData) {
        setReplies(repliesData || []);
      }
    } catch (error) {
      console.error('대댓글을 불러오는 중 오류가 발생했습니다:', error);
    }
  }, [comment.id]);

  // 대댓글 삭제/업데이트 후 상태를 즉시 업데이트하는 함수
  const handleReplyUpdated = useCallback(async () => {
    await loadReplies();
  }, [loadReplies]);

  useEffect(() => {
    loadReplies();
  }, [comment.id, loadReplies]);

  return (
    <Paper withBorder radius="md" p="md">
      <Anchor href={comment.user.homeUrl!} target="_blank" display="flex" w="fit-content">
        <Group>
          <Avatar src={comment.user.avatarUrl} alt={comment.user.name} radius="xl" />
          <Box>
            <Text size="sm">{comment.user.name}</Text>
            <Text size="xs" c="dimmed">
              {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </Box>
        </Group>
      </Anchor>
      {isEditMode ? (
        <CommentEditArea
          commentId={comment.id}
          content={comment.content}
          onUpdate={() => setIsEditMode(false)}
          refetch={async () => {
            await refetch();
            await loadReplies();
          }}
        />
      ) : (
        <Text className={styles.root} pl={54} py="sm" size="sm">
          {comment.content}
        </Text>
      )}

      <CommentOptions
        commentId={comment.id}
        postId={postId}
        creatorId={comment.userId}
        isEditMode={isEditMode}
        refetch={refetch}
        toggleEditMode={setIsEditMode}
        onReplyCreated={loadReplies}
        onReplyDeleted={loadReplies}
      />

      {replies.length > 0 && (
        <Box mt="md">
          {replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              postId={postId}
              depth={reply.depth || 1}
              parentCommentId={comment.id}
              refetch={refetch}
              onReplyUpdated={handleReplyUpdated}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}
