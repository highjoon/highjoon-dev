import { generatePostsMetadata } from '@/page/posts/model/meatadata';
import PostsPage from '@/page/posts/ui/PostsPage';

interface Params {
  params: { id: string };
}

export const generateMetadata = generatePostsMetadata;

export default function Page({ params }: Params) {
  return <PostsPage params={params} />;
}
