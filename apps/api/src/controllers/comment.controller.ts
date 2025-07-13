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
}

export const commentController = new CommentController();
