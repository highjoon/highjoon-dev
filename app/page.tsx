import Pagination from '@/components/Common/Pagination';
import PageContentsList from '@/components/Post/PageContentsList';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';
import getRecentPosts from '@/services/utils/getRecentPosts';

export default function Home() {
  const recentPosts = getRecentPosts(posts, DEFAULT_NUMBER_OF_POSTS_PER_PAGE);

  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-grey-900">Recent Posts</h1>
      <PageContentsList posts={recentPosts} />
      <Pagination>
        <Pagination.AllPages />
      </Pagination>
    </div>
  );
}
