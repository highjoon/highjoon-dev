import { POSTS_FILE_NAME } from '../constants/blogPosts';

const createPostPath = (slug: POSTS_FILE_NAME[keyof POSTS_FILE_NAME]) => {
  return '/blogs/' + slug;
};

export default createPostPath;
