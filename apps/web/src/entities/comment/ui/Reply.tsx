import React, { useCallback, useEffect, useState } from 'react';
import { Anchor, Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { CommentWithUser } from '@highjoon-dev/types';
import dayjs from 'dayjs';

import { getRepliesAction } from '@/entities/comment/api/getRepliesApi/getRepliesAction';
import CommentEditArea from '@/entities/comment/ui/CommentEditArea';
import CommentOptions from '@/entities/comment/ui/CommentOptions';

import styles from './Comment.module.scss';

type Props = {
  reply: CommentWithUser;
  postId: string;
  depth: number;
  parentCommentId: string;
  refetch: () => Promise<void>;
  onReplyUpdated?: () => Promise<void>;
};

export default function Reply({ reply, postId, depth, parentCommentId, refetch, onReplyUpdated }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nestedReplies, setNestedReplies] = useState<CommentWithUser[]>([]);

  const loadNestedReplies = useCallback(async () => {
    try {
      const nestedRepliesData = await getRepliesAction({ parentId: reply.id });

      if (nestedRepliesData) {
        setNestedReplies(nestedRepliesData || []);
      }
    } catch (error) {
      console.error('중첩 답글을 불러오는 중 오류가 발생했습니다:', error);
    }
  }, [reply.id]);

  useEffect(() => {
    loadNestedReplies();
  }, [reply.id, loadNestedReplies]);

  // 중첩된 대댓글의 상태 업데이트를 처리하는 함수
  const handleNestedReplyUpdated = useCallback(async () => {
    await loadNestedReplies();
    // 상위 컴포넌트에도 상태 업데이트 알림
    await onReplyUpdated?.();
  }, [loadNestedReplies, onReplyUpdated]);

  const handleRefetch = async () => {
    await refetch();
    await loadNestedReplies();
    // 상위 컴포넌트에도 상태 업데이트 알림
    await onReplyUpdated?.();
  };

  const marginLeft = `${(depth + 1) * 2}rem`;

  return (
    <>
      <Paper withBorder radius="md" p="sm" ml={marginLeft} mt="xs">
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
          onReplyCreated={loadNestedReplies}
          onReplyDeleted={handleNestedReplyUpdated}
          depth={depth}
        />
      </Paper>

      {/* 중첩 답글 표시 (3단계까지만 지원) */}
      {depth < 3 && nestedReplies.length > 0 && (
        <Box>
          {nestedReplies.map((nestedReply) => (
            <Reply
              key={nestedReply.id}
              reply={nestedReply}
              postId={postId}
              depth={depth + 1}
              parentCommentId={parentCommentId}
              refetch={refetch}
              onReplyUpdated={handleNestedReplyUpdated}
            />
          ))}
        </Box>
      )}
    </>
  );
}
