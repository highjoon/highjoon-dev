import { type Post } from '@highjoon-dev/types';

type Args = {
  postList: Post[];
};

const getAllTagsFromPosts = ({ postList }: Args) => {
  return postList.reduce<string[]>((acc, cur) => [...acc, ...cur.tags], []);
};

export default getAllTagsFromPosts;
