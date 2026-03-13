import { type TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import { tagService } from '@/entities/tag/services/tag.service';

export const getAllTagsApi = async (): Promise<TagWithCount[]> => {
  const response = await tagService.findAllTags();
  return (response.data as TagWithCount[]) ?? [];
};
