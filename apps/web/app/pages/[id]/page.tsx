import { generatePostsMetadata } from '@/page/posts/model/metadata';
import PostsPage from '@/page/posts/ui/PostsPage';

interface Params {
  params: { id: string };
}

export const generateMetadata = generatePostsMetadata;

export default function Page({ params }: Params) {
  return <PostsPage params={params} />;
}
