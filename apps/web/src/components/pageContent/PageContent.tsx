import React from 'react';
import Image from 'next/image';
import { Box, Flex, Group, Title } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';

import { MdxComponents } from '@/components/mdxComponents/MdxComponents';
import MDXContent from '@/components/mdxContent/MDXContent';
import ViewCount from '@/components/viewCount/ViewCount';

import styles from './PageContent.module.scss';

type Props = {
  title: Post['title'];
  bannerImageUrl: Post['bannerImageUrl'];
  content: string;
  viewCount: Post['viewCount'];
  slug: Post['slug'];
};

const PageContent = ({ title, bannerImageUrl, content, viewCount, slug }: Props) => {
  return (
    <Flex direction="column" w="100%" pos="relative" mb={20}>
      <Title order={1} className={styles.title}>
        {title}
      </Title>

      <Group className={styles['view-count']} gap="lg" align="center">
        <ViewCount viewCount={viewCount} slug={slug} />
      </Group>

      <Box className={styles.banner} pos="relative" w="100%">
        <Image src={bannerImageUrl} fill alt="content-logo" priority />
      </Box>

      <Flex id="page-content" direction="column">
        <MDXContent source={content} components={MdxComponents} />
      </Flex>
    </Flex>
  );
};

export default PageContent;
