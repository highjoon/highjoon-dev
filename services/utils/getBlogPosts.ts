import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BLOG_CONTENTS_DIR } from '../constants/blogPosts';
import { FrontMatter } from '../types/post';
import createBannerImgPath from './createBannerImgPath';

const getBlogPosts = (files: string[]) => {
  return files.map((fileName) => {
    const postTitle = fileName.replace('.mdx', '');
    const fileContent = readFileSync(path.join(BLOG_CONTENTS_DIR, fileName), 'utf-8');
    const { data, content } = matter(fileContent);
    const bannerImg = createBannerImgPath(postTitle);
    const frontMatter = { ...data, bannerImg };

    return {
      meta: frontMatter as FrontMatter,
      slug: postTitle,
      content,
    };
  });
};

export default getBlogPosts;
