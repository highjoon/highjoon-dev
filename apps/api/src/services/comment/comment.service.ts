import { Comment, prisma } from '@highjoon-dev/prisma';
import { CommentWithUser, Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { calculateCommentDepths } from '@/utils/calculateCommentDepths';
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
      const replies = await this.fetchRepliesWithUsers(parentId);

      if (replies.length === 0) {
        return ServiceResponse.success<CommentWithUser[]>('대댓글이 없습니다.', [], StatusCodes.OK);
      }

      const repliesWithDepth = await this.addDepthToReplies(replies, parentId);

      return ServiceResponse.success<CommentWithUser[]>(
        '대댓글 조회에 성공했습니다.',
        repliesWithDepth,
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findRepliesByComment Error');
    }
  };

  /** 대댓글과 사용자 정보를 함께 조회 */
  private fetchRepliesWithUsers = async (parentId: string): Promise<CommentWithUser[]> => {
    return await prisma.comment.findMany({
      where: { parentId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true, homeUrl: true },
        },
      },
    });
  };

  /** 대댓글에 depth 정보를 추가 */
  private addDepthToReplies = async (replies: CommentWithUser[], parentId: string): Promise<CommentWithUser[]> => {
    const replyIds = replies.map((reply) => reply.id);
    const commentMap = await this.buildCommentMap(replyIds, parentId);
    const depthMap = calculateCommentDepths(replyIds, commentMap);

    return replies.map((reply) => ({
      ...reply,
      depth: depthMap[reply.id] || 0,
    }));
  };

  /** 댓글 ID와 parentId 매핑을 위한 Map 생성 */
  private buildCommentMap = async (replyIds: string[], parentId: string): Promise<Record<string, string | null>> => {
    const allRelatedComments = await prisma.comment.findMany({
      where: {
        OR: [{ id: { in: replyIds } }, { parentId: { in: replyIds } }, { id: parentId }],
      },
      select: { id: true, parentId: true },
    });

    const commentMap: Record<string, string | null> = {};
    allRelatedComments.forEach((comment) => {
      commentMap[comment.id] = comment.parentId;
    });

    return commentMap;
  };

  /** 대댓글 수정 */
  public updateReply = async (commentId: string, content: string): Promise<ServiceResponse<Nullable<Comment>>> => {
    try {
      const updatedReply = await prisma.comment.update({
        where: { id: commentId },
        data: { content },
      });
      return ServiceResponse.success<Comment>('대댓글이 수정되었습니다.', updatedReply, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updateReply Error');
    }
  };

  /** 대댓글 삭제 */
  public deleteReply = async (commentId: string): Promise<ServiceResponse<null>> => {
    try {
      await prisma.comment.delete({ where: { id: commentId } });
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
        orderBy: { createdAt: 'asc' }, // 오름차순으로 변경 (오래된 댓글이 위에)
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, homeUrl: true },
          },
        },
      });

      // depth 정보를 포함하여 반환
      const commentsWithDepth = comments.map((comment) => ({
        ...comment,
        depth: 0,
      }));

      return ServiceResponse.success<CommentWithUser[]>('댓글 조회에 성공했습니다.', commentsWithDepth, StatusCodes.OK);
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
