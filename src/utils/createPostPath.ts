import { type POSTS_FILE_NAME } from '@/constants/blogPosts';
import { ROUTES } from '@/constants/routes';

const createPostPath = (slug: POSTS_FILE_NAME) => {
  return ROUTES.BLOGS + `/${slug}`;
};

export default createPostPath;
