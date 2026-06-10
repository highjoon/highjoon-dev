import { and, asc, count, db, desc, eq, gt, lt, schema, sql } from '@highjoon-dev/drizzle';
import { type Nullable, type PaginationMeta } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { type AdjacentPosts } from '@/entities/post/api/getPostApi/dto';
import { getTodayMidnight } from '@/entities/post/lib/getTomorrowMidnight';
import { type Post } from '@/entities/post/model/types';
import { postTagService } from '@/entities/tag/services/postTag.service';
import { tagService } from '@/entities/tag/services/tag.service';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { shapePostsWithRelations } from '@/shared/server/lib/shapePostsWithRelations';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

import { postViewLogService } from './postViewLog.service';
import { postViewStatsService } from './postViewStats.service';

class PostService {
  async findAllPosts(options?: {
    skip?: number;
    take?: number;
  }): Promise<ServiceResponse<Nullable<{ posts: Post[]; meta: PaginationMeta }>>> {
    try {
      const skip = options?.skip ?? 0;
      const take = options?.take ?? 10;

      const conditions = eq(schema.post.isHidden, false);

      const [posts, [{ value: total }]] = await Promise.all([
        db.select().from(schema.post).where(conditions).orderBy(desc(schema.post.publishedAt)).offset(skip).limit(take),
        db.select({ value: count() }).from(schema.post).where(conditions),
      ]);

      if (posts.length === 0 && skip === 0) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const shapedPosts = await shapePostsWithRelations(posts);
      const hasMore = skip + posts.length < total;

      return ServiceResponse.success(
        '게시물을 찾았습니다.',
        { posts: shapedPosts, meta: { total, skip, take, hasMore } },
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findAllPosts Error');
    }
  }

  async findPost(slug: Post['slug']): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const [post] = await db.select().from(schema.post).where(eq(schema.post.slug, slug)).limit(1);

      if (!post || post.isHidden) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const [shapedPost] = await shapePostsWithRelations([post]);

      return ServiceResponse.success<Post>('게시물을 찾았습니다.', shapedPost, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findPost Error');
    }
  }

  async findAdjacentPosts(slug: Post['slug']): Promise<ServiceResponse<Nullable<AdjacentPosts>>> {
    try {
      const [post] = await db.select().from(schema.post).where(eq(schema.post.slug, slug)).limit(1);

      if (!post || post.isHidden) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const [prevRows, nextRows] = await Promise.all([
        db
          .select({ slug: schema.post.slug, title: schema.post.title })
          .from(schema.post)
          .where(and(lt(schema.post.publishedAt, post.publishedAt), eq(schema.post.isHidden, false)))
          .orderBy(desc(schema.post.publishedAt))
          .limit(1),
        db
          .select({ slug: schema.post.slug, title: schema.post.title })
          .from(schema.post)
          .where(and(gt(schema.post.publishedAt, post.publishedAt), eq(schema.post.isHidden, false)))
          .orderBy(asc(schema.post.publishedAt))
          .limit(1),
      ]);

      return ServiceResponse.success(
        '인접 게시물을 찾았습니다.',
        { prev: prevRows[0] ?? null, next: nextRows[0] ?? null },
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findAdjacentPosts Error');
    }
  }

  async findFeaturedPost(): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const [post] = await db
        .select()
        .from(schema.post)
        .where(and(eq(schema.post.isFeatured, true), eq(schema.post.isHidden, false)))
        .orderBy(desc(schema.post.publishedAt))
        .limit(1);

      if (!post) {
        return ServiceResponse.failure('추천 게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const [shapedPost] = await shapePostsWithRelations([post]);

      return ServiceResponse.success<Post>('추천 게시물을 찾았습니다.', shapedPost, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findFeaturedPost Error');
    }
  }

  async createPost(data: Post & { tags?: string[] }): Promise<ServiceResponse<Nullable<Post>>> {
    try {
      const { tags, ...postData } = data;

      const created = await db.transaction(async (tx) => {
        const [post] = await tx.insert(schema.post).values(postData).returning();

        if (tags && tags.length > 0) {
          const tagRecords = await tagService.findOrCreateTags(tags);
          await tx
            .insert(schema.postTag)
            .values(tagRecords.map((tag) => ({ postId: post.id, tagId: tag.id })))
            .onConflictDoNothing();
        }

        return post;
      });

      const [shapedPost] = await shapePostsWithRelations([created]);

      return ServiceResponse.success('게시물이 생성되었습니다.', shapedPost, StatusCodes.CREATED);
    } catch (error) {
      return handleInternalError(error, 'createPost Error');
    }
  }

  async createManyPosts(data: Post[]): Promise<ServiceResponse<Nullable<Post[]>>> {
    try {
      const posts = await db.insert(schema.post).values(data).returning();

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

      const updated = await db.transaction(async (tx) => {
        await tx.update(schema.post).set(postData).where(eq(schema.post.id, id));

        if (tags !== undefined) {
          if (tags.length > 0) {
            const tagRecords = await tagService.findOrCreateTags(tags);
            await postTagService.syncPostTags(
              id,
              tagRecords.map((tag) => tag.id),
            );
          } else {
            await tx.delete(schema.postTag).where(eq(schema.postTag.postId, id));
          }
        }

        const [post] = await tx.select().from(schema.post).where(eq(schema.post.id, id)).limit(1);

        return post;
      });

      const [shapedPost] = await shapePostsWithRelations([updated]);

      return ServiceResponse.success('게시물이 수정되었습니다.', shapedPost, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'updatePost Error');
    }
  }

  public async increaseViewCount(slug: Post['slug'], ip: string) {
    try {
      const [post] = await db.select().from(schema.post).where(eq(schema.post.slug, slug)).limit(1);

      if (!post) {
        return ServiceResponse.failure('게시물이 존재하지 않습니다.', null, StatusCodes.NOT_FOUND);
      }

      const today = getTodayMidnight();

      const isFirstViewToday = await postViewLogService.logView(post.id, ip, today);

      if (!isFirstViewToday) {
        return ServiceResponse.success('오늘 이미 조회된 게시물입니다.', null, StatusCodes.OK);
      }

      const [updatedPost] = await db
        .update(schema.post)
        .set({ viewCount: sql`${schema.post.viewCount} + 1` })
        .where(eq(schema.post.slug, slug))
        .returning();

      await postViewStatsService.findOrCreateTodayStats(post.id, today);

      return ServiceResponse.success('조회수가 증가되었습니다.', updatedPost, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'increaseViewCount Error');
    }
  }
}

export const postService = new PostService();
