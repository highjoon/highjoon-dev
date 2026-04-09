import { Metadata } from 'next';

interface Params {
  params: Promise<{ id: string }>;
}

export const generatePostsMetadata = async ({ params: paramsPromise }: Params): Promise<Metadata> => {
  const { id } = await paramsPromise;

  return {
    title: `Page ${id} - highjoon-dev`,
    description: `highjoon-dev 글 목록 · ${id}페이지`,
    openGraph: {
      title: `Page ${id} - highjoon-dev`,
      description: `highjoon-dev 글 목록 · ${id}페이지`,
      type: 'website',
      url: `https://highjoon-dev.com/pages/${id}`,
    },
    alternates: {
      canonical: `https://highjoon-dev.com/pages/${id}`,
    },
  };
};
