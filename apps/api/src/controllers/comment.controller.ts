import { Request, Response } from 'express';

import { commentService } from '@/services/comment/comment.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

class CommentController {
  public createComment = async (req: Request & { userId?: string }, res: Response) => {
    const data = { ...req.body, userId: req.userId };
    const result = await commentService.createComment(data);

    handleServiceResponse(result, res);
  };

  public getCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const response = await commentService.findCommentsByPost(postId);

    handleServiceResponse(response, res);
  };

  public updateComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const result = await commentService.updateComment(commentId, content);

    handleServiceResponse(result, res);
  };

  public deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const result = await commentService.deleteComment(commentId);

    handleServiceResponse(result, res);
  };

  public createReply = async (req: Request, res: Response) => {
    const { postId, userId, content, parentId } = req.body;

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

    const response = await commentService.findRepliesByComment(parentId);

    handleServiceResponse(response, res);
  };

  public updateReply = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const result = await commentService.updateReply(commentId, content);

    handleServiceResponse(result, res);
  };

  public deleteReply = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    const result = await commentService.deleteReply(commentId);

    handleServiceResponse(result, res);
  };
}

export const commentController = new CommentController();
