import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { BLOG_CONTENTS_DIR, type POSTS_FILE_NAME } from '@/constants/blogPosts';
import { type FrontMatter } from '@/types/post';
import createBannerImgPath from '@/utils/createBannerImgPath';

const getBlogPost = ({ slug }: { slug: string }) => {
  const postTitle = slug.replace('.mdx', '') as POSTS_FILE_NAME;
  const markdownFile = readFileSync(path.join(BLOG_CONTENTS_DIR, slug + '.mdx'), 'utf-8');
  const { data, content } = matter(markdownFile);
  const bannerImg = createBannerImgPath(postTitle);
  const frontMatter = { ...data, bannerImg };

  return {
    frontMatter: frontMatter as FrontMatter,
    slug,
    content,
  };
};

export default getBlogPost;
