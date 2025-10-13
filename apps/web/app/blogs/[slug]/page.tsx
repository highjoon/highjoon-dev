import { type Post } from '@highjoon-dev/prisma';

import { generateBlogsMetadata } from '@/page/blogs/model/metadata';
import PostPage from '@/page/blogs/ui/PostPage';

export const dynamic = 'force-dynamic';

type Params = {
  params: { slug: Post['slug'] };
};

export const generateMetadata = generateBlogsMetadata;

export default async function Page({ params }: Params) {
  return <PostPage params={params} />;
}
