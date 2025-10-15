import { Metadata } from 'next';

interface Params {
  params: { id: string };
}

export const generatePostsMetadata = ({ params }: Params): Metadata => {
  const { id } = params;

  return {
    title: `Posts ${id} | highjoon-dev`,
    description: `highjoon's dev-log ${id} 페이지`,
    openGraph: {
      title: `Posts ${id} | highjoon-dev`,
      description: `highjoon's dev-log ${id} 페이지`,
      type: 'website',
      url: `https://highjoon-dev.com/pages/${id}`,
    },
    alternates: {
      canonical: `https://highjoon-dev.com/pages/${id}`,
    },
  };
};
