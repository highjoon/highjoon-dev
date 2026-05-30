import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type Post } from '@/entities/post/model/types';

export type GetFeaturedPostResponseDto = ServiceResponseInterface<Post>;
