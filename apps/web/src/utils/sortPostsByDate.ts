import { type Post } from '@highjoon-dev/types';

const sortPostsByDate = (posts: Post[]): Post[] => {
  const sortedPosts = [...posts];

  sortedPosts.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
};

export default sortPostsByDate;
