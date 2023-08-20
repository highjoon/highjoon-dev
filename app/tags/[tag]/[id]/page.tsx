import { notFound } from 'next/navigation';

import Pagination from '@/components/Common/Pagination';
import PageContentsList from '@/components/Post/PageContentsList';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { ROUTES } from '@/services/constants/routes';
import { posts } from '@/services/data/posts';
import calculateNumberOfTags from '@/services/utils/calculateNumberOfTags';
import calculateTagPageCount from '@/services/utils/calculateTagPageCount';
import generateTagPaths from '@/services/utils/generateTagPaths';
import getAllTagsFromPosts from '@/services/utils/getAllTagsFromPosts';
import getPageContents from '@/services/utils/getPageContents';
import validatePageNumber from '@/services/utils/validatePageNumber';

interface Params {
  params: {
    tag: string;
    id: string;
  };
}

export async function generateMetadata({ params: { tag, id } }: Params) {
  return {
    title: `#${tag} - ${id}`,
  };
}

export async function generateStaticParams() {
  const allTags = getAllTagsFromPosts();

  const pathsPerTag = allTags.map((tag) => {
    const numberOfTags = calculateNumberOfTags(posts, tag);
    const tagPageCount = calculateTagPageCount(numberOfTags);
    return generateTagPaths(tag, tagPageCount);
  });

  const paths = pathsPerTag.flat();
  return paths;
}

export default function Page({
  params,
}: {
  params: {
    tag: string;
    id: string;
  };
}) {
  const { tag: currentTag, id } = params;
  const pageNumber = parseInt(id);
  const postsWithTag = posts.filter((post) => post.tags.find((tag) => tag === currentTag));

  if (
    !validatePageNumber({ pageNumber, totalPagesOfPosts: posts.length, postsPerPage: DEFAULT_NUMBER_OF_POSTS_PER_PAGE })
  ) {
    return notFound();
  }

  const { currentPagePosts, hasNextPage } = getPageContents(postsWithTag, pageNumber);

  return (
    <div className="py-2 flex flex-col max-w-[768px] mx-auto gap-6">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-grey-900">#{currentTag}</h1>
      <PageContentsList posts={currentPagePosts} />
      <Pagination>
        <Pagination.PrevPageLink
          currentPageNumber={pageNumber}
          prevPageLink={ROUTES.TAGS + currentTag + `/${pageNumber - 1}`}
        />
        <Pagination.CurrentPage currentPageNumber={pageNumber} />
        <Pagination.NextPageLink
          currentPageNumber={pageNumber}
          nextPageLink={ROUTES.TAGS + currentTag + `/${pageNumber + 1}`}
          hasNextPage={hasNextPage}
        />
      </Pagination>
    </div>
  );
}
