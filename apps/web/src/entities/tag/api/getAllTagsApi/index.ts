import { toTagWithCount } from '@/entities/tag/lib/toTagWithCount';
import { type TagResponse } from '@/entities/tag/model/response';
import { type TagWithCount } from '@/entities/tag/model/types';
import { fetchApi } from '@/shared/api/fetchApi';

export const getAllTagsApi = async (): Promise<TagWithCount[]> => {
  const data = await fetchApi<TagResponse[]>('/tags');

  if (!data) {
    return [];
  }

  return data.map(toTagWithCount);
};
