import { prisma, type User } from '@highjoon-dev/prisma';
import { type LikedPost } from '@highjoon-dev/types';

import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

class UserService {
  public async findOrCreateUser(userData: User) {
    try {
      const existingUser = await prisma.user.findFirst({ where: { githubId: userData.githubId } });

      if (existingUser) {
        return existingUser;
      }

      const newUser = await prisma.user.create({ data: userData });

      return newUser;
    } catch (error) {
      throw new Error('사용자 생성/조회 실패', error as Error);
    }
  }

  public async findUserById(userId: User['id']) {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return ServiceResponse.failure('사용자를 찾을 수 없습니다.', null);
      }

      return ServiceResponse.success<User>('사용자 조회에 성공했습니다.', user);
    } catch (error) {
      return handleInternalError(error, 'findUserById Error');
    }
  }

  public async findLikedPostsByUserId(userId: User['id']) {
    try {
      const likedPosts = await prisma.postLike.findMany({
        where: { userId },
      });

      return ServiceResponse.success<LikedPost[]>('사용자 좋아요 게시물 조회에 성공했습니다.', likedPosts);
    } catch (error) {
      return handleInternalError(error, 'findLikedPostsByUserId Error');
    }
  }
}

export const userService = new UserService();
