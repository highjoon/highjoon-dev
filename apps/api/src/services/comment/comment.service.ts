import { Comment, prisma } from '@highjoon-dev/prisma';
import { CommentWithUser, Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';

class CommentService {
  public createComment = async (data: Comment): Promise<ServiceResponse<Nullable<Comment>>> => {
    try {
      const comment = await prisma.comment.create({ data });

      return ServiceResponse.success<Comment>('댓글이 성공적으로 생성되었습니다.', comment, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createComment Error');
    }
  };

  public findCommentsByPost = async (postId: string): Promise<ServiceResponse<Nullable<CommentWithUser[]>>> => {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, homeUrl: true },
          },
        },
      });

      return ServiceResponse.success<CommentWithUser[]>('댓글 조회에 성공했습니다.', comments, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findCommentsByPost Error');
    }
  };
}

export const commentService = new CommentService();
