import { type Post, prisma } from '@highjoon-dev/prisma';
import { type Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { ServiceResponse } from '@/models/servicesResponse';
import { postViewLogService } from '@/services/post/postViewLog.service';
import { postViewStatsService } from '@/services/post/postViewStats.service';
import { postTagService } from '@/services/tag/postTag.service';
import { tagService } from '@/services/tag/tag.service';
import { getTodayMidnight } from '@/utils/getTomorrowMidnight';
import { handleInternalError } from '@/utils/handleInternalError';

class PostService {
  async findAllPosts(): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { publishedAt: 'desc' },
        include: { postTags: { include: { tag: true } } },
      });

      if (posts.length === 0) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post[]>('게시물을 찾았습니다.', posts, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllPosts Error');
    }
  }

  async findPost(slug: Post['slug']): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const post = await prisma.post.findUnique({ where: { slug }, include: { postTags: { include: { tag: true } } } });

      if (!post) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post>('게시물을 찾았습니다.', post, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findPost Error');
    }
  }

  async findFeaturedPost(): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const post = await prisma.post.findFirst({
        where: { isFeatured: true },
        orderBy: { publishedAt: 'desc' },
        include: { postTags: { include: { tag: true } } },
      });

      if (!post) {
        return ServiceResponse.failure('추천 게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<Post>('추천 게시물을 찾았습니다.', post, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findFeaturedPost Error');
    }
  }

  async createPost(data: Post & { tags?: string[] }): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const { tags, ...postData } = data;

      const result = await prisma.$transaction(async (transaction) => {
        const post = await transaction.post.create({ data: postData });

        if (tags && tags.length > 0) {
          const tagRecords = await tagService.findOrCreateTags(tags);
          await transaction.postTag.createMany({
            data: tagRecords.map((tag) => ({ postId: post.id, tagId: tag.id })),
            skipDuplicates: true,
          });
        }

        return await transaction.post.findUnique({
          where: { id: post.id },
          include: { postTags: { include: { tag: true } } },
        });
      });

      return ServiceResponse.success('게시물이 생성되었습니다.', result as Post, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createPost Error');
    }
  }

  async createManyPosts(data: Post[]): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await prisma.post.createManyAndReturn({ data });

      return ServiceResponse.success<Post[]>('게시물이 생성되었습니다.', posts, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createManyPosts Error');
    }
  }

  async updatePost({
    id,
    data,
  }: {
    id: string;
    data: Post & { tags?: string[] };
  }): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const { tags, ...postData } = data;

      const result = await prisma.$transaction(async (transaction) => {
        await transaction.post.update({ where: { id }, data: postData });

        if (tags !== undefined) {
          if (tags.length > 0) {
            const tagRecords = await tagService.findOrCreateTags(tags);
            await postTagService.syncPostTags(
              id,
              tagRecords.map((tag) => tag.id),
            );
          } else {
            await transaction.postTag.deleteMany({ where: { postId: id } });
          }
        }

        return await transaction.post.findUnique({ where: { id }, include: { postTags: { include: { tag: true } } } });
      });

      return ServiceResponse.success('게시물이 수정되었습니다.', result as Post, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updatePost Error');
    }
  }

  public async increaseViewCount(slug: Post['slug'], ip: string) {
    try {
      const post = await prisma.post.findUnique({ where: { slug } });

      if (!post) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const today = getTodayMidnight();

      const isFirstViewToday = await postViewLogService.logView(post.id, ip, today);

      if (!isFirstViewToday) {
        return ServiceResponse.success('오늘 이미 조회된 게시물입니다.', null, StatusCodes.OK);
      }

      const updatedPost = await prisma.post.update({ where: { slug }, data: { viewCount: { increment: 1 } } });

      await postViewStatsService.findOrCreateTodayStats(post.id, today);

      return ServiceResponse.success('조회수가 증가되었습니다.', updatedPost, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'increaseViewCount Error');
    }
  }
}

export const postService = new PostService();
