import React, { useState } from 'react';
import { Comment } from '@highjoon-dev/prisma';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Textarea } from '@highjoon-dev/ui/components/Textarea';
import { toast } from 'sonner';

import { useUpdateComment } from '@/features/editComment/api/updateCommentApi/useUpdateComment';

interface Props {
  commentId: Comment['id'];
  content: Comment['content'];
  onUpdate: () => void;
  refetch: () => Promise<void>;
}

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
      await updateComment({ commentId, content: trimmedContent });
      await refetch();
      onUpdate();
    } catch {
      toast.error('오류가 발생했습니다.', {
        description: '댓글을 수정하는 중 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={editContent} onChange={(e) => setEditContent(e.currentTarget.value)} className="min-h-[80px]" />
      <div className="flex justify-end">
        <Button size="sm" onClick={handleUpdateComment} disabled={!editContent.trim() || isLoading}>
          {isLoading ? '수정 중...' : '확인'}
        </Button>
      </div>
    </div>
  );
}
