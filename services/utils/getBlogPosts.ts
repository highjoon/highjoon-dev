import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { BLOG_CONTENTS_DIR } from '../constants/blogs';

type FrontMatter = {
  title: string;
  description: string;
  date: string;
};

const getBlogPosts = (files: string[]) => {
  return files.map((fileName) => {
    const fileContent = readFileSync(path.join(BLOG_CONTENTS_DIR, fileName), 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

    return {
      meta: frontMatter as FrontMatter,
      slug: fileName.replace('.mdx', ''),
      content,
    };
  });
};

export default getBlogPosts;
