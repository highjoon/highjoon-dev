import { type Comment, prisma } from '@highjoon-dev/prisma';
import { type CommentWithUser, type Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { calculateCommentDepths } from '@/shared/server/lib/calculateCommentDepths';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

class CommentService {
  public async createComment(data: Comment): Promise<ServiceResponse<Nullable<Comment>>> {
    try {
      const comment = await prisma.comment.create({ data });

      return ServiceResponse.success<Comment>('댓글이 성공적으로 생성되었습니다.', comment, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createComment Error');
    }
  }

  public async findCommentsByPost(postId: string): Promise<ServiceResponse<Nullable<CommentWithUser[]>>> {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
          parentId: null,
        },
        orderBy: { createdAt: 'asc' },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true, homeUrl: true },
          },
        },
      });

      const commentsWithDepth = comments.map((comment) => ({
        ...comment,
        depth: 0,
      }));

      return ServiceResponse.success<CommentWithUser[]>('댓글 조회에 성공했습니다.', commentsWithDepth, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findCommentsByPost Error');
    }
  }

  public async updateComment(commentId: string, content: string): Promise<ServiceResponse<Nullable<Comment>>> {
    try {
      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { content },
      });

      return ServiceResponse.success<Comment>('댓글이 수정되었습니다.', updatedComment, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updateComment Error');
    }
  }

  public async deleteComment(commentId: string): Promise<ServiceResponse<null>> {
    try {
      await prisma.comment.delete({ where: { id: commentId } });

      return ServiceResponse.success<null>('댓글이 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      return handleInternalError(error, 'deleteComment Error');
    }
  }

  public async createReply(
    data: Omit<Comment, 'id'> & { parentId: string },
  ): Promise<ServiceResponse<Nullable<Comment>>> {
    try {
      const reply = await prisma.comment.create({ data });
      return ServiceResponse.success<Comment>('대댓글이 성공적으로 생성되었습니다.', reply, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createReply Error');
    }
  }

  public async findRepliesByComment(parentId: string): Promise<ServiceResponse<Nullable<CommentWithUser[]>>> {
    try {
      const replies = await this.fetchRepliesWithUsers(parentId);

      if (replies.length === 0) {
        return ServiceResponse.success<CommentWithUser[]>('대댓글이 없습니다.', [], StatusCodes.OK);
      }

      const repliesWithDepth = this.addDepthToReplies(replies, parentId);

      return ServiceResponse.success<CommentWithUser[]>(
        '대댓글 조회에 성공했습니다.',
        repliesWithDepth,
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findRepliesByComment Error');
    }
  }

  public async updateReply(commentId: string, content: string): Promise<ServiceResponse<Nullable<Comment>>> {
    try {
      const updatedReply = await prisma.comment.update({
        where: { id: commentId },
        data: { content },
      });
      return ServiceResponse.success<Comment>('대댓글이 수정되었습니다.', updatedReply, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updateReply Error');
    }
  }

  public async deleteReply(commentId: string): Promise<ServiceResponse<null>> {
    try {
      await prisma.comment.delete({ where: { id: commentId } });
      return ServiceResponse.success<null>('대댓글이 삭제되었습니다.', null, StatusCodes.NO_CONTENT);
    } catch (error) {
      return handleInternalError(error, 'deleteReply Error');
    }
  }

  private async fetchRepliesWithUsers(parentId: string): Promise<CommentWithUser[]> {
    return await prisma.comment.findMany({
      where: { parentId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true, homeUrl: true },
        },
      },
    });
  }

  private addDepthToReplies(replies: CommentWithUser[], parentId: string): CommentWithUser[] {
    const commentMap: Record<string, string | null> = {};
    commentMap[parentId] = null;
    replies.forEach((reply) => {
      commentMap[reply.id] = reply.parentId;
    });

    const replyIds = replies.map((reply) => reply.id);
    const depthMap = calculateCommentDepths(replyIds, commentMap);

    return replies.map((reply) => ({
      ...reply,
      depth: depthMap[reply.id] || 0,
    }));
  }
}

export const commentService = new CommentService();
