import { type Post } from '@highjoon-dev/prisma';

import { ROUTES } from '@/shared/routes/routes';

const createPostPath = (slug: Post['slug']) => {
  return ROUTES.BLOGS + `/${slug}`;
};

export default createPostPath;
