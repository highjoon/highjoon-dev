import { Post } from '../types/post';

const sortPostsByDate = (posts: Post[]): Post[] => {
  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
};

export default sortPostsByDate;
