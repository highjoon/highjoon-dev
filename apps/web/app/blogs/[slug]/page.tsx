import { type Post } from '@highjoon-dev/prisma';

import { generateBlogsMetadata } from '@/page/blogs/model/metadata';
import PostPage from '@/page/blogs/ui/PostPage';

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ slug: Post['slug'] }>;
};

export const generateMetadata = generateBlogsMetadata;

export default async function Page({ params: paramsPromise }: Params) {
  const params = await paramsPromise;
  return <PostPage params={params} />;
}
