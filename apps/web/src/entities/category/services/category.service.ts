import { and, asc, count, db, desc, eq, inArray, isNotNull, isNull, schema } from '@highjoon-dev/drizzle';
import { type Nullable, type PaginationMeta } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { type CategoryTree } from '@/entities/category/api/getAllCategoriesApi/dto';
import { type Category } from '@/entities/category/model/types';
import { type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { shapePostsWithRelations } from '@/shared/server/lib/shapePostsWithRelations';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

type CategoryWithRelations = Category & {
  parent: Category | null;
  children: Category[];
};

type PostsByCategoryResult = {
  posts: PostWithTags[];
  meta: PaginationMeta;
  category: Category;
};

class CategoryService {
  /**
   * 최상위 카테고리와 그 자식을 트리로 묶어 이름순으로 조회
   *
   * @returns parent별로 children이 붙은 CategoryTree (실패 시 500)
   */
  async findAllCategories(): Promise<ServiceResponse<Nullable<CategoryTree>>> {
    try {
      // 부모(최상위)와 자식을 각각 평탄하게 가져온 뒤 메모리에서 트리로 조립한다.
      const [parents, children] = await Promise.all([
        db.select().from(schema.category).where(isNull(schema.category.parentId)).orderBy(asc(schema.category.name)),
        db.select().from(schema.category).where(isNotNull(schema.category.parentId)).orderBy(asc(schema.category.name)),
      ]);

      const childrenByParent = new Map<string, Category[]>();
      for (const child of children) {
        if (!child.parentId) continue;
        const siblings = childrenByParent.get(child.parentId) ?? [];
        siblings.push(child);
        childrenByParent.set(child.parentId, siblings);
      }

      const categories: CategoryTree = parents.map((parent) => ({
        ...parent,
        children: childrenByParent.get(parent.id) ?? [],
      }));

      return ServiceResponse.success('카테고리를 조회했습니다.', categories, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllCategories Error');
    }
  }

  /**
   * slug로 카테고리 1건을 조회하고 parent(단건)와 children(목록)을 추가.
   *
   * @param slug 카테고리 slug
   * @returns parent/children가 붙은 카테고리 (없으면 404, 실패 시 500)
   */
  async findCategoryBySlug(slug: string): Promise<ServiceResponse<Nullable<CategoryWithRelations>>> {
    try {
      const [category] = await db.select().from(schema.category).where(eq(schema.category.slug, slug)).limit(1);

      if (!category) {
        return ServiceResponse.failure('카테고리를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      const [parentRows, children] = await Promise.all([
        category.parentId
          ? db.select().from(schema.category).where(eq(schema.category.id, category.parentId)).limit(1)
          : Promise.resolve([] as Category[]),
        db
          .select()
          .from(schema.category)
          .where(eq(schema.category.parentId, category.id))
          .orderBy(asc(schema.category.name)),
      ]);

      const result = { ...category, parent: parentRows[0] ?? null, children };

      return ServiceResponse.success('카테고리를 찾았습니다.', result, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findCategoryBySlug Error');
    }
  }

  /**
   * 카테고리(선택적으로 자식 포함)에 속한 게시물을 최신순으로 페이지네이션
   * 게시물마다 태그(postTags)와 카테고리 참조(categoryRef, 부모 포함)를 포함
   *
   * @param slug 기준 카테고리 slug
   * @param options skip/take 페이지네이션, includeChildren(최상위일 때 자식 글 포함 여부)
   * @returns posts/meta/category 묶음 (없으면 404, 실패 시 500)
   */
  async findPostsByCategorySlug(
    slug: string,
    options: { skip?: number; take?: number; includeChildren?: boolean } = {},
  ): Promise<ServiceResponse<Nullable<PostsByCategoryResult>>> {
    try {
      const { skip = 0, take = 10, includeChildren = true } = options;

      const [category] = await db.select().from(schema.category).where(eq(schema.category.slug, slug)).limit(1);

      if (!category) {
        return ServiceResponse.failure('카테고리를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      // 최상위 카테고리면 자식 카테고리 글까지 포함 (id만 필요)
      const childRows =
        includeChildren && category.parentId === null
          ? await db
              .select({ id: schema.category.id })
              .from(schema.category)
              .where(eq(schema.category.parentId, category.id))
          : [];
      const categoryIds = [category.id, ...childRows.map((c) => c.id)];

      const conditions = and(inArray(schema.post.categoryId, categoryIds), eq(schema.post.isHidden, false));

      // ① 게시물 페이지네이션 + 전체 개수 (count는 [{ value }] 반환)
      const [posts, [{ value: total }]] = await Promise.all([
        db.select().from(schema.post).where(conditions).orderBy(desc(schema.post.publishedAt)).offset(skip).limit(take),
        db.select({ value: count() }).from(schema.post).where(conditions),
      ]);

      // ② 게시물마다 태그/카테고리 참조를 셰이핑해 붙인다.
      const shapedPosts: PostWithTags[] = await shapePostsWithRelations(posts);

      const hasMore = skip + posts.length < total;

      return ServiceResponse.success(
        '게시물을 찾았습니다.',
        { posts: shapedPosts, meta: { total, skip, take, hasMore }, category },
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findPostsByCategorySlug Error');
    }
  }
}

export const categoryService = new CategoryService();
