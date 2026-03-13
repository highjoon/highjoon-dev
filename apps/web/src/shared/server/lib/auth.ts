import { type NextRequest } from 'next/server';
import { prisma } from '@highjoon-dev/prisma';
import { type UserData } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/shared/server/models/serviceResponse';

import { handleInternalError } from './handleInternalError';
import { handleServiceResponse } from './httpHandlers';
import { verifyToken } from './jwt';

export interface JwtPayload {
  userId: UserData['id'];
  role: UserData['role'];
}

export const authenticate = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: handleServiceResponse(
        ServiceResponse.failure('인증 토큰이 누락되었습니다.', null, StatusCodes.UNAUTHORIZED),
      ),
    };
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);

    return { userId: payload.userId };
  } catch {
    return {
      error: handleServiceResponse(
        ServiceResponse.failure('유효하지 않은 토큰입니다.', null, StatusCodes.UNAUTHORIZED),
      ),
    };
  }
};

export const verifyCommentAuthor = async (commentId: string, userId: string) => {
  try {
    if (!commentId) {
      return {
        error: handleServiceResponse(ServiceResponse.failure('잘못된 요청입니다.', null, StatusCodes.BAD_REQUEST)),
      };
    }

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) {
      return {
        error: handleServiceResponse(ServiceResponse.failure('댓글을 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND)),
      };
    }

    if (comment.userId !== userId) {
      return {
        error: handleServiceResponse(
          ServiceResponse.failure('작성자만 수정/삭제할 수 있습니다.', null, StatusCodes.FORBIDDEN),
        ),
      };
    }

    return { success: true as const };
  } catch (error) {
    const serviceResponse = handleInternalError(error, 'verifyCommentAuthor Error');

    return { error: handleServiceResponse(serviceResponse) };
  }
};
