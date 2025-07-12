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
}

export const commentController = new CommentController();
