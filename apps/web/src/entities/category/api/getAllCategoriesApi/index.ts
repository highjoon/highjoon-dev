import { type CategoryTree } from '@/entities/category/api/getAllCategoriesApi/dto';
import { categoryService } from '@/entities/category/services/category.service';

export const getAllCategoriesApi = async (): Promise<CategoryTree> => {
  const response = await categoryService.findAllCategories();
  return (response.data as CategoryTree) ?? [];
};
