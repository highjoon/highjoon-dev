import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BLOG_CONTENTS_DIR } from '../constants/blogs';
import { FrontMatter } from '../types/post';

const getBlogPost = ({ slug }: { slug: string }) => {
  const markdownFile = readFileSync(path.join(BLOG_CONTENTS_DIR, slug + '.mdx'), 'utf-8');
  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter: frontMatter as FrontMatter,
    slug,
    content,
  };
};

export default getBlogPost;
