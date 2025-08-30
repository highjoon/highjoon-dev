'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { type Post } from '@highjoon-dev/prisma';

import { getFeaturedPostApi, getPostList, increaseViewCount, likePostApi, unlikePostApi } from '@/apis/post';
import { ACCESS_TOKEN_KEY } from '@/constants';
import sortPostsByDate from '@/utils/sortPostsByDate';

export const increaseViewCountAction = async (slug: Post['slug']) => {
  await increaseViewCount(slug);
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

  const postList = await getPostList();
  const sortedPostsByDate = sortPostsByDate(postList.data).slice(0, 9);
  const splittedPosts = splitArray(sortedPostsByDate);

  return splittedPosts;
};

export const getFeaturedPost = async () => {
  const featuredPost = await getFeaturedPostApi();

  return featuredPost?.data;
};

export const likePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value;
  await likePostApi(postId, userId, accessToken);
  revalidatePath(`/blogs/${slug}`);
};

export const unlikePostAction = async (postId: Post['id'], userId: string, slug: Post['slug']) => {
  const accessToken = cookies().get(ACCESS_TOKEN_KEY)?.value;
  await unlikePostApi(postId, userId, accessToken);
  revalidatePath(`/blogs/${slug}`);
};
