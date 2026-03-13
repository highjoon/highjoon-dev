'use server';

import { type GetRepliesRequestDto } from '@/entities/comment/api/getRepliesApi/dto';
import { commentService } from '@/entities/comment/services/comment.service';

export const getRepliesAction = async (params: GetRepliesRequestDto) => {
  const response = await commentService.findRepliesByComment(params.parentId);
  return response.data ?? [];
};
