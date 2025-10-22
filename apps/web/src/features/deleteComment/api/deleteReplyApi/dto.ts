import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface DeleteReplyRequestDto {
  replyId: Comment['id'];
}

export type DeleteReplyResponseDto = ServiceResponseInterface<null>;
