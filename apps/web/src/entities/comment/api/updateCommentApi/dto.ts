import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface UpdateCommentRequestDto {
  commentId: Comment['id'];
  content: Comment['content'];
}

export type UpdateCommentResponseDto = ServiceResponseInterface<Comment>;
