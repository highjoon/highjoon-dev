import { type NextRequest } from 'next/server';

import { updateTagSchema } from '@/entities/tag/schemas/tag.schema';
import { tagService } from '@/entities/tag/services/tag.service';
import { authenticate } from '@/shared/server/lib/auth';
import { handleServiceResponse } from '@/shared/server/lib/httpHandlers';
import { ServiceResponse } from '@/shared/server/models/serviceResponse';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = async (_request: NextRequest, context: RouteContext) => {
  const { id } = await context.params;
  const result = await tagService.findTag(id);

  return handleServiceResponse(result);
};

export const PUT = async (request: NextRequest, context: RouteContext) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { id } = await context.params;
  const body = await request.json();
  const parsed = updateTagSchema.safeParse(body);

  if (!parsed.success) {
    return handleServiceResponse(ServiceResponse.failure(parsed.error.errors[0].message, null));
  }

  const result = await tagService.updateTag(id, parsed.data);

  return handleServiceResponse(result);
};

export const DELETE = async (request: NextRequest, context: RouteContext) => {
  const auth = authenticate(request);
  if ('error' in auth) return auth.error;

  const { id } = await context.params;
  const result = await tagService.deleteTag(id);

  return handleServiceResponse(result);
};
