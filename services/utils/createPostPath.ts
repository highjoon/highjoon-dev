import { FILE_NAME } from '../constants/blogPosts';

const createPostPath = (slug: FILE_NAME) => {
  return '/blogs/' + slug;
};

export default createPostPath;
