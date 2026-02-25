import { GetAllTagsResponseDto } from '@/entities/tag/api/getAllTagsApi/dto';
import { ApiClient } from '@/shared/api';

export const getAllTagsApi = async (api: ApiClient) => {
  const response = await api.get<GetAllTagsResponseDto>('/tag', {
    next: { revalidate: 3600, tags: ['all-tags'] },
  });
  return response.data;
};
