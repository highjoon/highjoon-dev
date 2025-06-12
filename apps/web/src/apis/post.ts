import { type Post } from '@highjoon-dev/prisma';
import { type ServiceResponseInterface, type UserData } from '@highjoon-dev/types';

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
  } catch {
    /* empty */
  }
};

export const getFeaturedPostApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/featured`, { cache: 'no-store' });
    const data: ServiceResponseInterface<Post> = await response.json();

    return data;
  } catch {
    /* empty */
  }
};

export const likePostApi = async (postId: Post['id'], userId: UserData['id'], token?: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    return response.json();
  } catch {
    /* empty */
  }
};
