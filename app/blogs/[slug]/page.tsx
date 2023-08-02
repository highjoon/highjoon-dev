import fs from 'fs';
import path from 'path';

import MDXContent from '@/components/MDX/MDXContent';
import getBlogPost from '@/services/utils/getBlogPost';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join('services/contents'));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}

export async function generateMetadata({ params }: any) {
  const blog = getBlogPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  };
}

export default function PostPage({ params }: any) {
  const { frontMatter, content } = getBlogPost(params);

  return (
    <article className="mx-auto prose-sm prose md:prose-base lg:prose-lg prose-slate">
      <h1>{frontMatter.title}</h1>
      <MDXContent source={content} />
    </article>
  );
}
