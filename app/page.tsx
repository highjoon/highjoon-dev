import Title from '@/components/Common/Title';
import PageContentsList from '@/components/Post/PageContentsList';
import useRecentPosts from '@/hooks/useRecentPosts';

export default function Page() {
  const { recentPosts } = useRecentPosts();

  return (
    <>
      <Title title="Recent Posts" />
      <PageContentsList posts={recentPosts} />
    </>
  );
}
