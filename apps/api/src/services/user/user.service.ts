import { prisma } from '@highjoon-dev/prisma';

import { type UserData } from '@/types/user';

class UserService {
  public async findOrCreateUser(userData: UserData) {
    try {
      const existingUser = await prisma.user.findFirst({ where: { id: userData.id } });

      if (existingUser) {
        return existingUser;
      }

      const newUser = await prisma.user.create({ data: userData });

      return newUser;
    } catch (error) {
      throw new Error('사용자 생성/조회 실패', error as Error);
    }
  }
}

export const userService = new UserService();
