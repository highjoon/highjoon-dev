import { Tag } from '@highjoon-dev/prisma';
import { ServiceResponseInterface } from '@highjoon-dev/types';

export type TagWithCount = Tag & {
  _count: {
    postTags: number;
  };
};

export type GetAllTagsResponseDto = ServiceResponseInterface<TagWithCount[]>;
