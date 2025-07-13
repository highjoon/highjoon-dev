import { prisma } from '@highjoon-dev/prisma';
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { type AuthenticatedRequest } from '@/types/auth';
import { handleInternalError } from '@/utils/handleInternalError';
import { handleServiceResponse } from '@/utils/httpHandlers';

export const verifyCommentAuthor = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      handleServiceResponse(ServiceResponse.failure('잘못된 요청입니다.', null, StatusCodes.BAD_REQUEST), res);

      return;
    }

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) {
      handleServiceResponse(ServiceResponse.failure('댓글을 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND), res);

      return;
    }

    const currentUserId = req.userId;

    if (comment.userId !== currentUserId) {
      handleServiceResponse(
        ServiceResponse.failure('작성자만 수정/삭제할 수 있습니다.', null, StatusCodes.FORBIDDEN),
        res,
      );

      return;
    }

    next();
  } catch (error) {
    handleInternalError(error, 'verifyCommentAuthor Error');
  }
};
