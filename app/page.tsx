import PageContentsList from '@/components/Post/PageContentsList';
import RecentPostsLayout from '@/components/Post/RecentPostsLayout';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';
import getRecentPosts from '@/services/utils/getRecentPosts';

export default function Home() {
  const recentPosts = getRecentPosts(posts, DEFAULT_NUMBER_OF_POSTS_PER_PAGE);

  return (
    <RecentPostsLayout>
      <PageContentsList currentPagePosts={recentPosts} />
    </RecentPostsLayout>
  );
}
