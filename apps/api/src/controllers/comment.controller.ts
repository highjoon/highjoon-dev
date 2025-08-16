import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { commentService } from '@/services/comment/comment.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class CommentController {
  public createComment = async (req: Request, res: Response) => {
    const result = await commentService.createComment(req.body);

    handleServiceResponse(result, res);
  };

  public getCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      handleServiceResponse(ServiceResponse.failure('postId가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const response = await commentService.findCommentsByPost(postId);

    handleServiceResponse(response, res);
  };

  public updateComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!commentId) {
      handleServiceResponse(
        ServiceResponse.failure('commentId가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    if (!content) {
      handleServiceResponse(
        ServiceResponse.failure('content가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const result = await commentService.updateComment(commentId, content);

    handleServiceResponse(result, res);
  };

  public deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    if (!commentId) {
      handleServiceResponse(
        ServiceResponse.failure('commentId가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const result = await commentService.deleteComment(commentId);

    handleServiceResponse(result, res);
  };

  public createReply = async (req: Request, res: Response) => {
    const { postId, userId, content, parentId } = req.body;

    // postId 유효성 검사
    if (!postId) {
      handleServiceResponse(ServiceResponse.failure('postId가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);
      return;
    }

    if (typeof postId !== 'string') {
      handleServiceResponse(
        ServiceResponse.failure('postId는 문자열이어야 합니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    // userId 유효성 검사
    if (!userId) {
      handleServiceResponse(ServiceResponse.failure('userId가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);
      return;
    }

    if (typeof userId !== 'string') {
      handleServiceResponse(
        ServiceResponse.failure('userId는 문자열이어야 합니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    // content 유효성 검사
    if (!content) {
      handleServiceResponse(ServiceResponse.failure('content가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);
      return;
    }

    if (typeof content !== 'string') {
      handleServiceResponse(
        ServiceResponse.failure('content는 문자열이어야 합니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    if (content.trim().length === 0) {
      handleServiceResponse(
        ServiceResponse.failure('content는 비어있을 수 없습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    if (content.length > 1000) {
      handleServiceResponse(
        ServiceResponse.failure('content는 1000자를 초과할 수 없습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    // parentId 유효성 검사
    if (!parentId) {
      handleServiceResponse(ServiceResponse.failure('parentId가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);
      return;
    }

    if (typeof parentId !== 'string') {
      handleServiceResponse(
        ServiceResponse.failure('parentId는 문자열이어야 합니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );
      return;
    }

    const result = await commentService.createReply({
      postId,
      userId,
      content,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    handleServiceResponse(result, res);
  };

  public getRepliesByComment = async (req: Request, res: Response) => {
    const { parentId } = req.params;

    if (!parentId) {
      handleServiceResponse(ServiceResponse.failure('parentId가 필요합니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const response = await commentService.findRepliesByComment(parentId);

    handleServiceResponse(response, res);
  };

  public updateReply = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!commentId) {
      handleServiceResponse(
        ServiceResponse.failure('replyId가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    if (!content) {
      handleServiceResponse(
        ServiceResponse.failure('content가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const result = await commentService.updateReply(commentId, content);

    handleServiceResponse(result, res);
  };

  public deleteReply = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    if (!commentId) {
      handleServiceResponse(
        ServiceResponse.failure('commentId가 존재하지 않습니다.', null, StatusCodes.BAD_REQUEST),
        res,
      );

      return;
    }

    const result = await commentService.deleteReply(commentId);

    handleServiceResponse(result, res);
  };
}

export const commentController = new CommentController();
