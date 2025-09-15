import React, { useCallback, useEffect, useState } from 'react';
import { Anchor, Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import { commentApi } from '@/apis/comment';
import CommentEditArea from '@/components/comments/CommentEditArea';
import CommentOptions from '@/components/comments/CommentOptions';
import Reply from '@/components/comments/Reply';
import { clientApi } from '@/shared/api';

import styles from './Comment.module.scss';

type Props = {
  comment: CommentWithUser;
  postId: string;
  refetch: () => Promise<void>;
};

const Comment = ({ comment, postId, refetch }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [replies, setReplies] = useState<CommentWithUser[]>([]);

  const loadReplies = useCallback(async () => {
    try {
      const repliesData = await commentApi(clientApi).getReplies({ parentId: comment.id });

      if (repliesData) {
        setReplies(repliesData.data || []);
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
};

export default Comment;
