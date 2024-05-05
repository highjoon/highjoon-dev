import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/comments/Comments';
import PageContent from '@/components/pageContent/PageContent';
import { BLOG_CONTENTS_DIR } from '@/constants/blogPosts';
import getBlogPost from '@/utils/getBlogPost';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(BLOG_CONTENTS_DIR));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const blog = getBlogPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  };
}

export default function Page({ params }: any) {
  const { frontMatter, content } = getBlogPost(params);

  return (
    <>
      <PageContent frontMatter={frontMatter} content={content} />
      <Comments />
    </>
  );
}
