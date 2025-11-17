import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CommentWithUser } from '@highjoon-dev/types';
import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';
import { Card, CardContent } from '@highjoon-dev/ui/components/Card';
import dayjs from 'dayjs';

import { getRepliesAction } from '@/entities/comment/api/getRepliesApi/getRepliesAction';
import Reply from '@/entities/comment/ui/Reply';
import CommentEditArea from '@/features/editComment/ui/CommentEditArea';
import CommentOptions from '@/features/manageComment/ui/CommentOptions';

interface Props {
  comment: CommentWithUser;
  postId: string;
  refetch: () => Promise<void>;
}

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
    <Card className="p-4">
      <CardContent className="flex flex-col gap-4 p-0">
        <Link
          href={comment.user.homeUrl!}
          target="_blank"
          className="flex items-center gap-3 transition-opacity w-fit hover:opacity-70">
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{comment.user.name}</span>
            <time className="text-xs text-muted-foreground">
              {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </time>
          </div>
        </Link>

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
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{comment.content}</p>
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
          <div className="mt-4 space-y-3">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
