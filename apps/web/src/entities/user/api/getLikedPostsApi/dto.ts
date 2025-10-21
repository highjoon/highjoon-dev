import { LikedPost, ServiceResponseInterface } from '@highjoon-dev/types';

export interface GetLikedPostsRequestDto {
  userId: string;
}

export type GetLikedPostsResponseDto = ServiceResponseInterface<LikedPost[]>;
