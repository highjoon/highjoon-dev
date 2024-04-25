import { notFound } from 'next/navigation';
import Pagination from '@/components/Common/Pagination';
import Title from '@/components/Common/title/Title';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/constants/blogPosts';
import { ROUTES } from '@/constants/routes';
import { posts } from '@/data/posts';
import getPageContents from '@/utils/getPageContents';
import validatePageNumber from '@/utils/validatePageNumber';

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Params) {
  return {
    title: `Pages ${id}`,
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

  const { currentPagePosts, hasNextPage } = getPageContents(posts, pageNumber);

  return (
    <>
      <Title title="Posts">
        <Title.Subtitle subTitle={`Page ${pageNumber}`} />
      </Title>
      {/* <PageContentsList posts={currentPagePosts} /> */}
      <Pagination>
        <Pagination.PrevPageLink currentPageNumber={pageNumber} prevPageLink={ROUTES.PAGES + `${pageNumber - 1}`} />
        <Pagination.CurrentPage currentPageNumber={pageNumber} />
        <Pagination.NextPageLink
          currentPageNumber={pageNumber}
          nextPageLink={ROUTES.PAGES + `${pageNumber + 1}`}
          hasNextPage={hasNextPage}
        />
      </Pagination>
    </>
  );
}
