'use server';

import { type Comment } from '@highjoon-dev/prisma';

import { type CreateCommentRequestDto } from '@/features/createComment/api/createCommentApi/dto';
import { commentService } from '@/shared/server/services/comment.service';

export const createCommentAction = async (params: CreateCommentRequestDto) => {
  const result = await commentService.createComment(params as unknown as Comment);
  return result.data;
};
