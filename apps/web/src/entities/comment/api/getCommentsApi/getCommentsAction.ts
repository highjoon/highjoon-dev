'use server';

import { type GetCommentsRequestDto } from '@/entities/comment/api/getCommentsApi/dto';
import { commentService } from '@/shared/server/services/comment.service';

export const getCommentsAction = async (params: GetCommentsRequestDto) => {
  const response = await commentService.findCommentsByPost(params.postId);
  return response.data ?? [];
};
