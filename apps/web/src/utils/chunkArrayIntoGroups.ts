import { Post } from '@highjoon-dev/prisma';

export const chunkPostsIntoGroups = (array: Post[]) => {
  const result = [];

  for (let index = 0; index < array.length; index += 3) {
    let tempArray = [];
    tempArray = array.slice(index, index + 3);
    result.push(tempArray);
  }

  return result;
};
