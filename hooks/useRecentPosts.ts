import { posts } from '@/services/data/posts';
import sortPostsByDate from '@/services/utils/sortPostsByDate';

const useRecentPosts = () => {
  const sortedPostsByDate = sortPostsByDate(posts);

  return {
    recentPosts: sortedPostsByDate.slice(0, 5),
  };
};

export default useRecentPosts;
