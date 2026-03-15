import { generatePostsMetadata } from '@/page/posts/model/metadata';
import PostsPage from '@/page/posts/ui/PostsPage';

interface Params {
  params: Promise<{ id: string }>;
}

export const generateMetadata = generatePostsMetadata;

export default async function Page({ params: paramsPromise }: Params) {
  const params = await paramsPromise;
  return <PostsPage params={params} />;
}
