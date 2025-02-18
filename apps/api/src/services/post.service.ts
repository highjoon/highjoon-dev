import { type Post } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

import prisma from '@/client';
import { ServiceResponse } from '@/models/servicesResponse';
import { type Nullable } from '@/types/nullable';
import { handleInternalError } from '@/utils/handleInternalError';

class PostService {
  async findAllPosts(): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.findMany();

      if (posts.length === 0) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post[]>('게시물을 찾았습니다.', posts, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllPosts Error');
    }
  }

  async findPost(id: string): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const post = await prisma.post.findUnique({ where: { id } });

      if (!post) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post>('게시물을 찾았습니다.', post, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findPost Error');
    }
  }

  async createPost(data: Post): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const post = await prisma.post.create({ data });

      return ServiceResponse.success<Post>('게시물이 생성되었습니다.', post, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createPost Error');
    }
  }

  async createManyPosts(data: Post[]): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.createManyAndReturn({ data });

      return ServiceResponse.success<Post[]>('게시물이 생성되었습니다.', posts, StatusCodes.CREATED);
    } catch (error) {
      console.log(error);

      return handleInternalError(error, 'createManyPosts Error');
    }
  }

  async updatePost({ id, data }: { id: string; data: Post }): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const post = await prisma.post.update({ where: { id }, data });

      return ServiceResponse.success<Post>('게시물이 수정되었습니다.', post, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updatePost Error');
    }
  }
}

export const postService = new PostService();
