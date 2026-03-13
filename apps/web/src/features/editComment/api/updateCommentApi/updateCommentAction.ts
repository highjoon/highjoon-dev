'use server';

import { commentService } from '@/entities/comment/services/comment.service';
import { type UpdateCommentRequestDto } from '@/features/editComment/api/updateCommentApi/dto';

export const updateCommentAction = async (params: UpdateCommentRequestDto) => {
  await commentService.updateComment(params.commentId, params.content);
};
