import { categoryService } from '@/entities/category/services/category.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const GET = async () => {
  const result = await categoryService.findAllCategories();
  return handleServiceResponse(result);
};
