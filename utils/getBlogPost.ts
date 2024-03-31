import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BLOG_CONTENTS_DIR, FILE_NAME } from '../constants/blogPosts';
import { FrontMatter } from '../types/post';
import createBannerImgPath from './createBannerImgPath';

const getBlogPost = ({ slug }: { slug: string }) => {
  const postTitle = slug.replace('.mdx', '') as FILE_NAME;
  const markdownFile = readFileSync(path.join(BLOG_CONTENTS_DIR, slug + '.mdx'), 'utf-8');
  const { data, content } = matter(markdownFile);
  const bannerImg = createBannerImgPath(postTitle);
  const frontMatter = { ...data, bannerImg, url: `/blogs/${data.title}` };

  return {
    frontMatter: frontMatter as FrontMatter,
    slug,
    content,
  };
};

export default getBlogPost;
