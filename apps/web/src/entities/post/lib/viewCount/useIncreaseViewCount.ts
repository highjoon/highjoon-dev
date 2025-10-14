import { useEffect, useRef } from 'react';
import { Post } from '@highjoon-dev/prisma';

import { increaseViewCountAction } from '@/entities/post/lib/viewCount/increaseViewCountAction';

interface Args {
  slug: Post['slug'];
}

export const useIncreaseViewCount = ({ slug }: Args) => {
  const isFirstRender = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    increaseViewCountAction({ slug });
    isFirstRender.current = true;
  }, [slug]);
};
