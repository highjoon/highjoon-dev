import { Comment, prisma } from '@highjoon-dev/prisma';
import { CommentWithUser, Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';

class CommentService {
  /** 대댓글 생성 */
  public createReply = async (
    data: Omit<Comment, 'id'> & { parentId: string },
  ): Promise<ServiceResponse<Nullable<Comment>>> => {
    try {
      const reply = await prisma.comment.create({ data });
      return ServiceResponse.success<Comment>('대댓글이 성공적으로 생성되었습니다.', reply, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createReply Error');
    }
  };

  /** 특정 댓글의 대댓글 조회 */
  public findRepliesByComment = async (parentId: string): Promise<ServiceResponse<Nullable<CommentWithUser[]>>> => {
    try {
      const replies = await prisma.comment.findMany({
        where: { parentId },
        orderBy: { createdAt: 'asc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, homeUrl: true },
          },
        },
      });
      return ServiceResponse.success<CommentWithUser[]>('대댓글 조회에 성공했습니다.', replies, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findRepliesByComment Error');
    }
  };

  /** 대댓글 수정 */
  public updateReply = async (replyId: string, content: string): Promise<ServiceResponse<Nullable<Comment>>> => {
    try {
      const updatedReply = await prisma.comment.update({
        where: { id: replyId },
        data: { content },
      });
      return ServiceResponse.success<Comment>('대댓글이 수정되었습니다.', updatedReply, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updateReply Error');
    }
  };

  /** 대댓글 삭제 */
  public deleteReply = async (replyId: string): Promise<ServiceResponse<null>> => {
    try {
      await prisma.comment.delete({ where: { id: replyId } });
      return ServiceResponse.success<null>('대댓글이 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      return handleInternalError(error, 'deleteReply Error');
    }
  };

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
        where: {
          postId,
          parentId: null, // 대댓글은 제외하고 최상위 댓글만 가져오기
        },
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

  public updateComment = async (commentId: string, content: string): Promise<ServiceResponse<Nullable<Comment>>> => {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { content },
      });

      return ServiceResponse.success<Comment>('댓글이 수정되었습니다.', updatedComment, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updateComment Error');
    }
  };

  public deleteComment = async (commentId: string): Promise<ServiceResponse<null>> => {
    try {
      await prisma.comment.delete({ where: { id: commentId } });

      return ServiceResponse.success<null>('댓글이 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      return handleInternalError(error, 'deleteComment Error');
    }
  };
}

export const commentService = new CommentService();
