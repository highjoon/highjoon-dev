import { Comment } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export interface CreateReplyRequestDto {
  postId: Comment['postId'];
  userId: Comment['userId'];
  content: Comment['content'];
  parentId: Comment['id'];
}

export type CreateReplyResponseDto = ServiceResponseInterface<Comment>;
