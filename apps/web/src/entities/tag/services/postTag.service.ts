import { db, desc, eq, getTableColumns, inArray, schema } from '@highjoon-dev/drizzle';
import { type Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { type Post } from '@/entities/post/model/types';
import { type Tag } from '@/entities/tag/model/types';
import { attachTagsToPosts } from '@/shared/server/lib/attachTagsToPosts';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

class PostTagService {
  /**
   * 게시물의 태그를 주어진 목록으로 바꾼다. 트랜잭션으로 기존 연결을 지우고 새로 넣되, 목록이 비면 제거만 한다.
   *
   * @param postId 대상 게시물 ID
   * @param tagIds 연결할 태그 ID 목록 (이 목록으로 완전히 대체됨)
   */
  async syncPostTags(postId: Post['id'], tagIds: Tag['id'][]): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.delete(schema.postTag).where(eq(schema.postTag.postId, postId));
      if (!tagIds.length) return;
      await tx
        .insert(schema.postTag)
        .values(tagIds.map((tagId) => ({ postId, tagId })))
        .onConflictDoNothing();
    });
  }

  /**
   * 게시물에 달린 태그를 조회한다. 연결된 태그가 없으면 빈 배열.
   *
   * @param postId 대상 게시물 ID
   * @returns 태그 배열을 담은 ServiceResponse (실패 시 500)
   */
  async findTagsByPost(postId: Post['id']): Promise<ServiceResponse<Nullable<Tag[]>>> {
    try {
      const tags: Tag[] = await db
        .select(getTableColumns(schema.tag))
        .from(schema.postTag)
        .innerJoin(schema.tag, eq(schema.tag.id, schema.postTag.tagId))
        .where(eq(schema.postTag.postId, postId));

      return ServiceResponse.success('태그를 조회했습니다.', tags, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findTagsByPost Error');
    }
  }

  /**
   * 태그가 달린 게시물을 최신순으로 페이지네이션해 가져온다. 게시물마다 달린 태그도 함께 담는다.
   *
   * @param tagId 기준 태그 ID
   * @param options 페이지네이션 옵션 (offset: 건너뛸 개수, limit: 가져올 개수)
   * @returns 게시물 배열을 담은 ServiceResponse (실패 시 500)
   */
  async findPostsByTag(
    tagId: Tag['id'],
    options = { offset: 0, limit: 10 },
  ): Promise<ServiceResponse<Nullable<PostWithTags[]>>> {
    try {
      // ① 태그가 달린 게시물을 최신순으로 페이지네이션
      const taggedPosts = await db
        .select(getTableColumns(schema.post))
        .from(schema.post)
        .innerJoin(schema.postTag, eq(schema.postTag.postId, schema.post.id))
        .where(eq(schema.postTag.tagId, tagId))
        .orderBy(desc(schema.post.publishedAt))
        .limit(options.limit)
        .offset(options.offset);
      const postIds = taggedPosts.map((post) => post.id);

      // ② 그 게시물들의 (postTag, tag) 행을 한 번에 조회
      const tagRows = postIds.length
        ? await db
            .select({ postTag: getTableColumns(schema.postTag), tag: getTableColumns(schema.tag) })
            .from(schema.postTag)
            .innerJoin(schema.tag, eq(schema.tag.id, schema.postTag.tagId))
            .where(inArray(schema.postTag.postId, postIds))
        : [];

      const posts = attachTagsToPosts(taggedPosts, tagRows);
      return ServiceResponse.success('게시물을 찾았습니다.', posts, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findPostsByTag Error');
    }
  }
}

export const postTagService = new PostTagService();
