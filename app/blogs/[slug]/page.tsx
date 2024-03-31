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
    metadataBase: new URL('https://highjoon-dev.vercel.app'),
    openGraph: {
      title: blog.frontMatter.title,
      description: blog.frontMatter.description,
      images: blog.frontMatter.bannerImg,
      url: `/blogs/${blog.slug}`,
      locale: 'ko',
      type: 'website',
      siteName: 'highjoon-dev',
    },
    applicationName: 'highjoon-dev',
    authors: [{ name: 'highjoon' }],
    creator: 'highjoon',
    publisher: 'highjoon',
    referrer: 'origin-when-cross-origin',
    icons: {
      icon: '/favicon/apple-icon.png',
      shortcut: '/favicon/apple-icon.png',
      apple: '/favicon/apple-icon.png',
      other: {
        rel: '/favicon/apple-icon-precomposed',
        url: '/favicon/apple-icon-precomposed.png',
      },
    },
  };
}

export default function Page({ params }: any) {
  const { frontMatter, content } = getBlogPost(params);

  return <PageContent title={frontMatter.title} bannerImg={frontMatter.bannerImg} content={content} />;
}
