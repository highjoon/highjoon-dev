import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface CreateCommentRequestDto {
  postId: Comment['postId'];
  userId: Comment['userId'];
  content: Comment['content'];
}

export type CreateCommentResponseDto = ServiceResponseInterface<Comment>;
