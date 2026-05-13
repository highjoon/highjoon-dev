import { prisma } from '@highjoon-dev/prisma';
import { type Nullable } from '@highjoon-dev/types';
import { StatusCodes } from 'http-status-codes';

import { type CategoryTree } from '@/entities/category/api/getAllCategoriesApi/dto';
import { handleInternalError } from '@/shared/server/lib/handleInternalError';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

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

  async findCategoryBySlug(slug: string) {
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
}

export const categoryService = new CategoryService();
