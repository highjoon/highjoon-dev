import { type Post, type ServiceResponseInterface } from '@highjoon-dev/types';

export const getPostList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, { cache: 'no-store' });
  const data: ServiceResponseInterface<Post[]> = await response.json();

  return data;
};

export const getPost = async (slug: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${slug}`, { cache: 'no-store' });
  const data: ServiceResponseInterface<Post> = await response.json();

  return data;
};
