import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface DeleteCommentRequestDto {
  commentId: Comment['id'];
}

export type DeleteCommentResponseDto = ServiceResponseInterface<null>;
