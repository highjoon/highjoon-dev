import { type Post } from '@highjoon-dev/types';

import { getPostList } from '@/apis/post';
import sortPostsByDate from '@/utils/sortPostsByDate';

const splitArray = (array: Post[]) => {
  const result = [];

  for (let index = 0; index < array.length; index += 3) {
    let tempArray = [];
    tempArray = array.slice(index, index + 3);
    result.push(tempArray);
  }

  return result;
};

const useGetRecentPosts = async () => {
  const postList = await getPostList();
  const sortedPostsByDate = sortPostsByDate(postList.responseObject).slice(0, 9);
  const splittedPosts = splitArray(sortedPostsByDate);

  return {
    recentPosts: splittedPosts,
  };
};

export default useGetRecentPosts;
