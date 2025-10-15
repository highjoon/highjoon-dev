import { Post } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export type GetAllPostsResponseDto = ServiceResponseInterface<Post[]>;
