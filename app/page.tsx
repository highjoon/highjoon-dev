import Title from '@/components/Common/title/Title';
import PageContentsList from '@/components/Post/pageContentsList/PageContentsList';
import useRecentPosts from '@/hooks/useRecentPosts';

export default function Page() {
  const { recentPosts } = useRecentPosts();

  return (
    <>
      <Title title="Latest Post" />
      <PageContentsList posts={recentPosts} />
    </>
  );
}
