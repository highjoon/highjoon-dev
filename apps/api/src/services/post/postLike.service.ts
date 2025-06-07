import { type Post, prisma } from '@highjoon-dev/prisma';
import { type UserData } from '@highjoon-dev/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';

class PostLikeService {
  async likePost(userId: UserData['id'], postId: Post['id']) {
    try {
      const postLikeCount = await prisma.postLike.count({ where: { userId, postId } });

      if (postLikeCount > 0) {
        return ServiceResponse.failure('이미 좋아요를 눌렀습니다.', null, StatusCodes.BAD_REQUEST);
      }

      await prisma.$transaction([
        prisma.postLike.create({ data: { userId, postId } }),
        prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } }),
      ]);

      return ServiceResponse.success('게시물에 좋아요가 추가되었습니다.', null);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return ServiceResponse.failure('이미 좋아요를 눌렀습니다.', null, StatusCodes.BAD_REQUEST);
        }
      }

      return handleInternalError(error, 'likePost Error');
    }
  }
}

export const postLikeService = new PostLikeService();
