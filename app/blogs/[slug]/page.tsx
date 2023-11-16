import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

import PageContent from '@/components/Post/PageContent';
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
    openGraph: {
      images: blog.frontMatter.bannerImg,
    },
  };
}

export default function Page({ params }: any) {
  const { frontMatter, content } = getBlogPost(params);

  return <PageContent title={frontMatter.title} bannerImg={frontMatter.bannerImg} content={content} />;
}
