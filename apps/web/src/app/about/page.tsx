import { type Metadata } from 'next';
import { Flex, Title } from '@mantine/core';

import AboutMe from '@/components/aboutMe/AboutMe';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About | highjoon-dev',
    description: 'About highjoon',
    keywords: ['프론트엔드', 'React', 'Next.js', 'TypeScript', 'highjoon'],
    openGraph: {
      title: 'About | highjoon-dev',
      description: 'About highjoon',
      type: 'website',
      url: 'https://highjoon-dev.com/about',
    },
    alternates: {
      canonical: 'https://highjoon-dev.com/about',
    },
  };
}

export default function Page() {
  return (
    <Flex direction="column" gap={100}>
      <Title component="h1" order={1}>
        About
      </Title>
      <AboutMe />
    </Flex>
  );
}
