import { Comment } from '@highjoon-dev/prisma';
import { CommentWithUser, ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetRepliesRequestDto {
  parentId: Comment['id'];
}

export type GetRepliesResponseDto = ServiceResponseInterface<CommentWithUser[]>;
