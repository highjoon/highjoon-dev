import { type Nullable, type Tag } from '@highjoon-dev/types';

import prisma from '@/client';
import { ServiceResponse } from '@/models/servicesResponse';
import { handleInternalError } from '@/utils/handleInternalError';

class TagService {
  async findAllTags(): Promise<ServiceResponse<Nullable<Tag[]>>> {
    try {
      const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });

      if (tags.length === 0) {
        return ServiceResponse.failure('태그가 존재하지 않습니다.', null);
      }

      return ServiceResponse.success<Tag[]>('태그를 찾았습니다.', tags);
    } catch (error) {
      return handleInternalError(error, 'findAllTags Error');
    }
  }
}

export const tagService = new TagService();
