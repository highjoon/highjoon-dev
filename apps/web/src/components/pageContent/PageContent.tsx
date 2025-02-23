import React from 'react';
import Image from 'next/image';
import { Box, Flex, Group, Text, Title } from '@mantine/core';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { MdxComponents } from '@/components/mdxComponents/MdxComponents';
import MDXContent from '@/components/mdxContent/MDXContent';
import { type FrontMatter } from '@/types/post';

import styles from './PageContent.module.scss';

type Props = { frontMatter: FrontMatter; content: string; viewCount: number };

const PageContent = ({ frontMatter, content, viewCount }: Props) => {
  return (
    <Flex direction="column" w="100%" pos="relative" mb={20}>
      <Title order={1} className={styles.title}>
        {frontMatter.title}
      </Title>

      <Group className={styles['view-count']} gap="lg" align="center" justify="center" ml="auto">
        <Flex justify="center" gap={10}>
          <MdOutlineRemoveRedEye size={23} />
          <Text component="span" h={25}>
            {viewCount.toLocaleString()}
          </Text>
        </Flex>
      </Group>

      <Box className={styles.banner} pos="relative" w="100%">
        <Image src={frontMatter.bannerImg} fill alt="content-logo" priority />
      </Box>

      <Flex id="page-content" direction="column">
        <MDXContent source={content} components={MdxComponents} />
      </Flex>
    </Flex>
  );
};

export default PageContent;
