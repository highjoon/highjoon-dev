import { FILE_NAME } from '../constants/blogPosts';
import { ROUTES } from '../constants/routes';

const createPostPath = (slug: FILE_NAME) => {
  return ROUTES.BLOGS + `/${slug}`;
};

export default createPostPath;
