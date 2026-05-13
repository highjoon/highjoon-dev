import { type NextRequest } from 'next/server';

import { categoryService } from '@/entities/category/services/category.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export const GET = async (request: NextRequest, context: RouteContext) => {
  const { slug } = await context.params;
  const skip = parseInt(request.nextUrl.searchParams.get('skip') ?? '0', 10);
  const take = parseInt(request.nextUrl.searchParams.get('take') ?? '10', 10);
  const includeChildrenParam = request.nextUrl.searchParams.get('includeChildren');
  const includeChildren = includeChildrenParam === null ? undefined : includeChildrenParam !== 'false';

  const result = await categoryService.findPostsByCategorySlug(slug, { skip, take, includeChildren });

  return handleServiceResponse(result);
};
