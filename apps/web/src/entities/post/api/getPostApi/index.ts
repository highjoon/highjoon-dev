import { type GetPostRequestDto, type PostWithTags } from '@/entities/post/api/getPostApi/dto';
import { postService } from '@/entities/post/services/post.service';

export const getPostApi = async (params: GetPostRequestDto): Promise<PostWithTags | null> => {
  const response = await postService.findPost(params.slug);

  return (response.data as PostWithTags) ?? null;
};
