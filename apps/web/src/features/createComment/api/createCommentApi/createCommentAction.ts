'use server';

import { type Comment } from '@highjoon-dev/prisma';

import { commentService } from '@/entities/comment/services/comment.service';
import { type CreateCommentRequestDto } from '@/features/createComment/api/createCommentApi/dto';

export const createCommentAction = async (params: CreateCommentRequestDto) => {
  const result = await commentService.createComment(params as unknown as Comment);
  return result.data;
};
