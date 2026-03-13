'use server';

import { type GetLikedPostsRequestDto } from '@/entities/user/api/getLikedPostsApi/dto';
import { userService } from '@/entities/user/services/user.service';

export const getLikedPostsAction = async (params: GetLikedPostsRequestDto) => {
  const response = await userService.findLikedPostsByUserId(params.userId);
  return response.data ?? [];
};
