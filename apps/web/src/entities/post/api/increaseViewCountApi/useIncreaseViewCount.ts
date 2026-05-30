import { useEffect, useRef } from 'react';

import { increaseViewCountAction } from '@/entities/post/api/increaseViewCountApi/increaseViewCountAction';
import { type Post } from '@/entities/post/model/types';

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
