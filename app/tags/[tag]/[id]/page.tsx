import { notFound } from 'next/navigation';
import Title from '@/components/Common/title/Title';
import { DEFAULT_NUMBER_OF_POSTS_PER_PAGE } from '@/constants/blogPosts';
import { posts } from '@/data/posts';
import calculateNumberOfTags from '@/utils/calculateNumberOfTags';
import calculateTagPageCount from '@/utils/calculateTagPageCount';
import generateTagPaths from '@/utils/generateTagPaths';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';
import getPageContents from '@/utils/getPageContents';
import validatePageNumber from '@/utils/validatePageNumber';

interface Params {
  params: {
    tag: string;
    id: string;
  };
}

export async function generateMetadata({ params: { tag, id } }: Params) {
  return {
    title: `# ${tag} - ${id}`,
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
    <>
      <Title title={`# ${currentTag}`}>
        <Title.Subtitle subTitle={`Page ${id}`} />
      </Title>
      {/* <PageContentsList posts={currentPagePosts} /> */}
    </>
  );
}
