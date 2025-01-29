import { POSTS_FILE_NAME } from '@/constants/blogPosts';

export type FrontMatter = {
  title: string;
  description: string;
  date: string;
  bannerImg: string;
  tags: string[];
};

export interface Post extends FrontMatter {
  fileName: POSTS_FILE_NAME;
}

export interface TagPath {
  tag: string;
  id: string;
}
