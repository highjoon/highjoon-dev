import { posts } from '../data/posts';

const getAllTagsFromPosts = () => {
  return posts.reduce<string[]>((acc, cur) => [...acc, ...cur.tags], []);
};

export default getAllTagsFromPosts;
