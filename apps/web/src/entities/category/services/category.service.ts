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
}

export const categoryService = new CategoryService();
