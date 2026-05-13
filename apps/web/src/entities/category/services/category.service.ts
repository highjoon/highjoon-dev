import { Prisma, prisma } from '@highjoon-dev/prisma';
import { type Nullable, type PaginationMeta } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { type CategoryTree } from '@/entities/category/api/getAllCategoriesApi/dto';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

type CategoryWithRelations = Prisma.CategoryGetPayload<{
  include: { parent: true; children: true };
}>;

type PostsByCategoryResult = {
  posts: Prisma.PostGetPayload<{
    include: { postTags: { include: { tag: true } }; categoryRef: true };
  }>[];
  meta: PaginationMeta;
  category: Prisma.CategoryGetPayload<{ include: { children: { select: { id: true } } } }>;
};

class CategoryService {
  async findAllCategories(): Promise<ServiceResponse<Nullable<CategoryTree>>> {
    try {
      const categories = await prisma.category.findMany({
        where: { parentId: null },
        include: { children: { orderBy: { name: 'asc' } } },
        orderBy: { name: 'asc' },
      });

      return ServiceResponse.success('카테고리를 조회했습니다.', categories, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findAllCategories Error');
    }
  }

  async findCategoryBySlug(slug: string): Promise<ServiceResponse<Nullable<CategoryWithRelations>>> {
    try {
      const category = await prisma.category.findUnique({
        where: { slug },
        include: { parent: true, children: { orderBy: { name: 'asc' } } },
      });

      if (!category) {
        return ServiceResponse.failure('카테고리를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success('카테고리를 찾았습니다.', category, StatusCodes.OK);
    } catch (error) {
      return handleInternalError(error, 'findCategoryBySlug Error');
    }
  }

  async findPostsByCategorySlug(
    slug: string,
    options: { skip?: number; take?: number; includeChildren?: boolean } = {},
  ): Promise<ServiceResponse<Nullable<PostsByCategoryResult>>> {
    try {
      const { skip = 0, take = 10, includeChildren = true } = options;

      const category = await prisma.category.findUnique({
        where: { slug },
        include: { children: { select: { id: true } } },
      });

      if (!category) {
        return ServiceResponse.failure('카테고리를 찾을 수 없습니다.', null, StatusCodes.NOT_FOUND);
      }

      const categoryIds =
        includeChildren && category.parentId === null
          ? [category.id, ...category.children.map((c) => c.id)]
          : [category.id];

      const where = { categoryId: { in: categoryIds }, isHidden: false };

      const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
          where,
          orderBy: { publishedAt: 'desc' },
          skip,
          take,
          include: {
            postTags: { include: { tag: true } },
            categoryRef: true,
          },
        }),
        prisma.post.count({ where }),
      ]);

      const hasMore = skip + posts.length < total;

      return ServiceResponse.success(
        '게시물을 찾았습니다.',
        { posts, meta: { total, skip, take, hasMore }, category },
        StatusCodes.OK,
      );
    } catch (error) {
      return handleInternalError(error, 'findPostsByCategorySlug Error');
    }
  }
}

export const categoryService = new CategoryService();
