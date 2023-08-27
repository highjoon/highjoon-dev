import Title from '@/components/Common/Title';
import HashTag from '@/components/Tags/HashTag';
import { ROUTES } from '@/services/constants/routes';
import countTags from '@/services/utils/countTags';
import getAllTagsFromPosts from '@/services/utils/getAllTagsFromPosts';

export async function generateMetadata() {
  return {
    title: 'highJoon-dev [Tags]',
  };
}

export default async function Page() {
  const allTags = getAllTagsFromPosts();
  const tagCountsArray = countTags(allTags);

  return (
    <>
      <Title title="Tags" />
      <div className="flex flex-wrap gap-2">
        {tagCountsArray.map((tagCount, index) => {
          const tag = Object.keys(tagCount)[0];
          const count = tagCount[tag];
          return (
            <HashTag key={tag + index} href={ROUTES.TAGS + tag + '/1'} passHref tag={`# ${tag}`}>
              <HashTag.Count count={count} />
            </HashTag>
          );
        })}
      </div>
    </>
  );
}
