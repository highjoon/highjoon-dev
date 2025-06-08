import React from 'react';
import Image from 'next/image';
import { Box, Flex, Group, Title } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';

import { MdxComponents } from '@/components/mdxComponents/MdxComponents';
import MDXContent from '@/components/mdxContent/MDXContent';
import ViewCount from '@/components/viewCount/ViewCount';

import styles from './PageContent.module.scss';

type Props = {
  postId: Post['id'];
  title: Post['title'];
  bannerImageUrl: Post['bannerImageUrl'];
  content: string;
  viewCount: Post['viewCount'];
  slug: Post['slug'];
  likeCount: Post['likeCount'];
};

/** @TODO 추후 오픈 */
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
const PageContent = ({ postId, title, bannerImageUrl, content, viewCount, slug, likeCount }: Props) => {
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

      <Group justify="center" align="center" mt={20} mb={20}>
        {/* <LikeButton postId={postId} likeCount={likeCount} /> */}
      </Group>
    </Flex>
  );
};

export default PageContent;
