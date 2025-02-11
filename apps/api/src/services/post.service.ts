import { type Post } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import prisma from '@/client';
import { ServiceResponse } from '@/models/servicesResponse';
import { logger } from '@/server';
import { type Nullable } from '@/types/nullable';

export class PostService {
  async findAll(): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.findMany();

      if (!posts || posts.length === 0) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post[]>('게시물을 찾았습니다.', posts, StatusCodes.OK);
    } catch (error) {
      const errorMessage = `에러가 발생했습니다. ${(error as Error).message}`;
      logger.error(errorMessage);

      return ServiceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const postService = new PostService();
