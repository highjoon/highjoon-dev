'use server';

import { type UpdateCommentRequestDto } from '@/features/editComment/api/updateCommentApi/dto';
import { commentService } from '@/shared/server/services/comment.service';

export const updateCommentAction = async (params: UpdateCommentRequestDto) => {
  await commentService.updateComment(params.commentId, params.content);
};
