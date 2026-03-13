'use server';

import { commentService } from '@/entities/comment/services/comment.service';
import { type CreateReplyRequestDto } from '@/features/createReply/api/createReplyApi/dto';

export const createReplyAction = async (params: CreateReplyRequestDto) => {
  const result = await commentService.createReply({
    ...params,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.data;
};
