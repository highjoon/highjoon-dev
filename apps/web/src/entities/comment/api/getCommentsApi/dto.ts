import { Comment } from '@highjoon-dev/prisma';
import { CommentWithUser, ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetCommentsRequestDto {
  postId: Comment['postId'];
}

export type GetCommentsResponseDto = ServiceResponseInterface<CommentWithUser[]>;
