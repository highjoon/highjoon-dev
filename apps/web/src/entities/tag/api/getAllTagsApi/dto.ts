import { ServiceResponseInterface } from '@highjoon-dev/types';

import { type TagWithCount } from '@/entities/tag/model/types';

export type GetAllTagsResponseDto = ServiceResponseInterface<TagWithCount[]>;
