import Link from 'next/link';

import Title from '@/components/Common/Title';
import { ROUTES } from '@/services/constants/routes';
import getAllTagsFromPosts from '@/services/utils/getAllTagsFromPosts';

const getAllTags = async () => {
  const allTags = getAllTagsFromPosts();
  return allTags;
};

export async function generateMetadata() {
  return {
    title: 'highJoon-dev [Tags]',
  };
}

export default async function Page() {
  const allTags = await getAllTags();

  return (
    <>
      <Title title="Tags" />
      <div className="flex flex-wrap gap-2 px-2">
        {allTags.map((tag, index) => (
          <Link
            key={tag + index}
            href={ROUTES.TAGS + tag + '/1'}
            passHref
            className="px-2 py-1 text-xs rounded-lg sm:text-sm text-primary-500 bg-primary-50 shrink-0 hover:bg-primary-100">
            # {tag}
          </Link>
        ))}
      </div>
    </>
  );
}
