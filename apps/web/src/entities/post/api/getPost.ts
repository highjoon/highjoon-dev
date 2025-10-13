import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

import { GetPostDto } from '@/entities/post/model/dto/getPostDto';
import { ApiClient } from '@/shared/api';

/**
 * 게시물 조회
 * @param api ApiClient
 * @param params GetPostDto
 * @returns 게시물
 */
export const getPost = async (api: ApiClient, params: GetPostDto) => {
  const response = await api.get<ServiceResponseInterface<Post>>(`/post/${params.slug}`);

  return response.data;
};
