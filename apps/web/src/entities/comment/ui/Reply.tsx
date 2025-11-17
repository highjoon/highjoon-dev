import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CommentWithUser } from '@highjoon-dev/types';
import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';
import { Card, CardContent } from '@highjoon-dev/ui/components/Card';
import dayjs from 'dayjs';

import { getRepliesAction } from '@/entities/comment/api/getRepliesApi/getRepliesAction';
import CommentEditArea from '@/features/editComment/ui/CommentEditArea';
import CommentOptions from '@/features/manageComment/ui/CommentOptions';

interface Props {
  reply: CommentWithUser;
  postId: string;
  depth: number;
  parentCommentId: string;
  refetch: () => Promise<void>;
  onReplyUpdated?: () => Promise<void>;
}

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
      <Card className="p-3 mt-2" style={{ marginLeft } as React.CSSProperties}>
        <CardContent className="flex flex-col gap-3 p-0">
          <Link
            href={reply.user.homeUrl!}
            target="_blank"
            className="flex items-center gap-2 transition-opacity w-fit hover:opacity-70">
            <Avatar className="w-8 h-8">
              <AvatarImage src={reply.user.avatarUrl} alt={reply.user.name} />
              <AvatarFallback className="text-xs">{reply.user.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{reply.user.name}</span>
              <time className="text-xs text-muted-foreground">
                {dayjs(reply.createdAt).format('YYYY-MM-DD HH:mm:ss')}
              </time>
            </div>
          </Link>

          {isEditMode ? (
            <CommentEditArea
              commentId={reply.id}
              content={reply.content}
              onUpdate={() => setIsEditMode(false)}
              refetch={handleRefetch}
            />
          ) : (
            <p className="text-xs leading-relaxed break-words whitespace-pre-wrap">{reply.content}</p>
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
        </CardContent>
      </Card>

      {/* 중첩 답글 표시 (3단계까지만 지원) */}
      {depth < 3 && nestedReplies.length > 0 && (
        <div className="space-y-2">
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
        </div>
      )}
    </>
  );
}
