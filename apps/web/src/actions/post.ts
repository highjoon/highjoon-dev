'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/types';

import { getPostList, increaseViewCount } from '@/apis/post';
import sortPostsByDate from '@/utils/sortPostsByDate';

export const increaseViewCountAction = async (slug: Post['slug']) => {
  await increaseViewCount(slug);
  revalidatePath(`/post/${slug}`);
};

export const getRecentPosts = async () => {
  const splitArray = (array: Post[]) => {
    const result = [];

    for (let index = 0; index < array.length; index += 3) {
      let tempArray = [];
      tempArray = array.slice(index, index + 3);
      result.push(tempArray);
    }

    return result;
  };

  const postList = await getPostList();
  const sortedPostsByDate = sortPostsByDate(postList.responseObject).slice(0, 9);
  const splittedPosts = splitArray(sortedPostsByDate);

  return splittedPosts;
};
