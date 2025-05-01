import { type Post } from '@highjoon-dev/prisma';

import { ROUTES } from '@/constants/routes';

const createPostPath = (slug: Post['slug']) => {
  return ROUTES.BLOGS + `/${slug}`;
};

export default createPostPath;
