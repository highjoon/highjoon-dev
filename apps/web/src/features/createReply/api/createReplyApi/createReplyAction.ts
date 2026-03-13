'use server';

import { type CreateReplyRequestDto } from '@/features/createReply/api/createReplyApi/dto';
import { commentService } from '@/shared/server/services/comment.service';

export const createReplyAction = async (params: CreateReplyRequestDto) => {
  const result = await commentService.createReply({
    ...params,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.data;
};
