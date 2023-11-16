import { Post } from '../types/post';

const calculateNumberOfTags = (posts: Post[], tag: string) => {
  const numberOfTags = posts.reduce((count, post) => {
    if (post.tags.includes(tag)) {
      return count + 1;
    }
    return count;
  }, 0);
  return numberOfTags;
};

export default calculateNumberOfTags;
