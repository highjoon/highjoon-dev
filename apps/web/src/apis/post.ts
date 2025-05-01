import { type Post } from '@highjoon-dev/prisma';
import { type ServiceResponseInterface } from '@highjoon-dev/types';

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

export const increaseViewCount = async (slug: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${slug}/view`, { method: 'PUT' });
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {}
};

export const getFeaturedPostApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/featured`, { cache: 'no-store' });
    const data: ServiceResponseInterface<Post> = await response.json();

    return data;
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (error) {}
};
