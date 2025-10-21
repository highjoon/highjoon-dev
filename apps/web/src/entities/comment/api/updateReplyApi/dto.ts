import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface UpdateReplyRequestDto {
  replyId: Comment['id'];
  content: Comment['content'];
}

export type UpdateReplyResponseDto = ServiceResponseInterface<Comment>;
