import { type NextRequest } from 'next/server';

import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { createTagSchema } from '@/shared/server/schemas/tag.schema';
import { tagService } from '@/shared/server/services/tag.service';

export const GET = async () => {
  const result = await tagService.findAllTags();

  return handleServiceResponse(result);
};

export const POST = async (request: NextRequest) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

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
