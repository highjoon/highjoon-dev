import { Post } from '../types/post';

const getDateTime = (date: string) => new Date(date).getTime();
const sortPost = (prev: Post, next: Post) => getDateTime(next.date) - getDateTime(prev.date);

const getRecentPosts = (posts: Post[], count: number): Post[] => {
  const sortedPosts = [...posts].sort(sortPost);
  return sortedPosts.slice(0, count);
};

export default getRecentPosts;
