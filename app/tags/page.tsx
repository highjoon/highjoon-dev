import Title from '@/components/Common/Title';
import PageContent from '@/components/Tag/PageContent';
import countTags from '@/utils/countTags';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';

export async function generateMetadata() {
  return {
    title: 'Tags',
  };
}

export default async function Page() {
  const allTags = getAllTagsFromPosts();
  const tagCountsArray = countTags(allTags);

  return (
    <>
      <Title title="Tags" />
      <PageContent tagCountsArray={tagCountsArray} />
    </>
  );
}
