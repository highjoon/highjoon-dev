'use server';

import { revalidatePath } from 'next/cache';
import { type Post } from '@highjoon-dev/prisma';

import { serverApi } from '@/apis/apiClient/serverApi';
import { postApi } from '@/apis/post';
import sortPostsByDate from '@/utils/sortPostsByDate';

export const increaseViewCountAction = async (slug: Post['slug']) => {
  await postApi(serverApi).increaseViewCount(slug);
  revalidatePath(`/blogs/${slug}`);
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

  const postList = await postApi(serverApi).getAll();
  const sortedPostsByDate = sortPostsByDate(postList.data).slice(0, 9);
  const splittedPosts = splitArray(sortedPostsByDate);

  return splittedPosts;
};

export const getFeaturedPost = async () => {
  const featuredPost = await postApi(serverApi).getFeatured();

  return featuredPost?.data;
};

export const likePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await postApi(serverApi).like(postId, userId);
  revalidatePath(`/blogs/${slug}`);
};

export const unlikePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  await postApi(serverApi).unlike(postId, userId);
  revalidatePath(`/blogs/${slug}`);
};
