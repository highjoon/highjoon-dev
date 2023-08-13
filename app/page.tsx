import PageContents from '@/components/Post/PageContents';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';
import getRecentPosts from '@/services/utils/getRecentPosts';

export default function Home() {
  const recentPosts = getRecentPosts(posts, DEFAULT_NUMBER_OF_POSTS_PER_PAGE);

  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <PageContents currentPagePosts={recentPosts} />
    </div>
  );
}
