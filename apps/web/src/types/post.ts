import { Post } from '@highjoon-dev/prisma';

export type FrontMatter = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
  tags: string[];
};

export interface TagPath {
  tag: string;
  id: string;
}

export interface PostApiRequest {
  get: { slug: Post['slug'] };
  create: { post: Post };
  update: { slug: Post['slug']; post: Post };
  delete: { slug: Post['slug'] };
  increaseViewCount: { slug: Post['slug'] };
  like: { postId: Post['id']; userId: string };
  unlike: { postId: Post['id']; userId: string };
}
