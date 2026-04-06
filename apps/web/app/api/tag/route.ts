import { type NextRequest } from 'next/server';

import { createTagSchema } from '@/entities/tag/schemas/tag.schema';
import { tagService } from '@/entities/tag/services/tag.service';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';

export const GET = async () => {
  const result = await tagService.findAllTags();

  return handleServiceResponse(result);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const parsed = createTagSchema.safeParse(body);

  if (!parsed.success) {
    return handleServiceResponse(
      (await import('@/shared/server/models/serviceResponse')).ServiceResponse.failure(
        parsed.error.errors[0].message,
        null,
      ),
    );
  }

  const result = await tagService.createTag(parsed.data);

  return handleServiceResponse(result);
};
