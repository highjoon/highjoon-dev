import { notFound } from 'next/navigation';

import Pagination from '@/components/Common/Pagination';
import PageContentsList from '@/components/Post/PageContentsList';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/services/constants/blogPosts';
import { posts } from '@/services/data/posts';
import getPageContents from '@/services/utils/getPageContents';
import validatePageNumber from '@/services/utils/validatePageNumber';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Page ${id}`,
  };
}

export function generateStaticParams() {
  const postsPerPage = new Array(Math.round(posts.length / DEFAULT_NUMBER_OF_POSTS_PER_PAGE)).keys();
  const params = [...postsPerPage].map((index) => ({ id: `${index + 1}` }));
  return params;
}

export default function Page({ params }: Params) {
  const pageNumber = parseInt(params.id);

  if (
    !validatePageNumber({ pageNumber, totalPagesOfPosts: posts.length, postsPerPage: DEFAULT_NUMBER_OF_POSTS_PER_PAGE })
  ) {
    return notFound();
  }

  const { currentPagePosts, hasNextPage } = getPageContents(pageNumber);

  return (
    <>
      <PageContentsList currentPagePosts={currentPagePosts} />
      <Pagination
        currentPageNumber={pageNumber}
        nextPageLink={`/pages/${pageNumber + 1}`}
        prevPageLink={`/pages/${pageNumber - 1}`}
        hasNextPage={hasNextPage}
      />
    </>
  );
}
