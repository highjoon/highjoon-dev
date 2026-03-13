import { type GetAllPostsParams, type PostsWithMeta } from '@/entities/post/api/getAllPostsApi/dto';
import { postService } from '@/entities/post/services/post.service';

export const getAllPostsApi = async (params?: GetAllPostsParams): Promise<PostsWithMeta> => {
  const response = await postService.findAllPosts({
    skip: params?.skip,
    take: params?.limit ?? params?.take,
  });

  return response.data ?? { posts: [], meta: { total: 0, skip: 0, take: 10, hasMore: false } };
};
