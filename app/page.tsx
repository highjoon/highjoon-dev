import PageContentsList from '@/components/Post/PageContentsList';
import PostsLayout from '@/components/Post/PostsLayout';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';
import getRecentPosts from '@/services/utils/getRecentPosts';

export default function Home() {
  const recentPosts = getRecentPosts(posts, DEFAULT_NUMBER_OF_POSTS_PER_PAGE);

  return (
    <PostsLayout title="Recent Posts">
      <PageContentsList posts={recentPosts} />
    </PostsLayout>
  );
}
