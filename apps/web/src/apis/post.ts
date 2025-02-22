import { type Post, type ServiceResponseInterface } from '@highjoon-dev/types';

export const getPostList = async () => {
  const response = await fetch(`${process.env.API_URL}/post`);
  const data: ServiceResponseInterface<Post[]> = await response.json();

  return data;
};

export const getPost = async (slug: string) => {
  const response = await fetch(`${process.env.API_URL}/post/${slug}`);
  const data: ServiceResponseInterface<Post> = await response.json();

  return data;
};
