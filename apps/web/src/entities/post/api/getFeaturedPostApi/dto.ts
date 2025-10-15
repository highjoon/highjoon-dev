import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export type GetFeaturedPostResponseDto = ServiceResponseInterface<Post>;
