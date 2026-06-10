import { alias, db, eq, getTableColumns, inArray, schema } from '@highjoon-dev/drizzle';

import { type CategoryRef } from '@/entities/post/api/getPostApi/dto';
import { type PostTag } from '@/entities/post/model/types';
import { type Tag } from '@/entities/tag/model/types';

import { attachTagsToPosts } from './attachTagsToPosts';

type WithRelations<P> = P & {
  postTags: (PostTag & { tag: Tag })[];
  categoryRef: CategoryRef | null;
};

/**
 * 게시물 목록에 태그(postTags)와 카테고리 참조(categoryRef, 부모 포함)를 셰이핑해 붙인다.
 * Drizzle엔 중첩 include가 없어, (postTag, tag) / (category, parent) 조인 결과를 메모리에서 결합한다.
 *
 * @param posts id와 categoryId를 가진 게시물 목록
 * @returns 각 게시물에 postTags와 categoryRef가 붙은 새 배열
 */
export const shapePostsWithRelations = async <P extends { id: string; categoryId: string | null }>(
  posts: P[],
): Promise<WithRelations<P>[]> => {
  const postIds = posts.map((post) => post.id);
  const categoryIds = [...new Set(posts.map((post) => post.categoryId).filter((id): id is string => id !== null))];

  // (postTag, tag)와 (category, parent) 참조를 한 번에 끌어온다.
  const parentCategory = alias(schema.category, 'parentCategory');
  const [tagRows, categoryRefRows] = await Promise.all([
    postIds.length
      ? db
          .select({ postTag: getTableColumns(schema.postTag), tag: getTableColumns(schema.tag) })
          .from(schema.postTag)
          .innerJoin(schema.tag, eq(schema.tag.id, schema.postTag.tagId))
          .where(inArray(schema.postTag.postId, postIds))
      : Promise.resolve([]),
    categoryIds.length
      ? db
          .select({
            id: schema.category.id,
            slug: schema.category.slug,
            name: schema.category.name,
            parentId: schema.category.parentId,
            parentRefId: parentCategory.id,
            parentRefSlug: parentCategory.slug,
            parentRefName: parentCategory.name,
          })
          .from(schema.category)
          .leftJoin(parentCategory, eq(parentCategory.id, schema.category.parentId))
          .where(inArray(schema.category.id, categoryIds))
      : Promise.resolve([]),
  ]);

  // categoryId → CategoryRef 맵 (leftJoin이라 부모 없으면 parent를 null로 정규화)
  const categoryRefById = new Map<string, CategoryRef>();
  for (const row of categoryRefRows) {
    categoryRefById.set(row.id, {
      id: row.id,
      slug: row.slug,
      name: row.name,
      parentId: row.parentId,
      parent:
        row.parentId && row.parentRefId
          ? { id: row.parentRefId, slug: row.parentRefSlug!, name: row.parentRefName! }
          : null,
    });
  }

  const postsWithTags = attachTagsToPosts(posts, tagRows);

  return postsWithTags.map((post) => ({
    ...post,
    categoryRef: post.categoryId ? (categoryRefById.get(post.categoryId) ?? null) : null,
  }));
};
