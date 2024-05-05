import Image from 'next/image';
import React from 'react';
import { Box, Flex, Title } from '@mantine/core';
import { MdxComponents } from '@/components/mdxComponents/MdxComponents';
import MDXContent from '@/components/mdxContent/MDXContent';
import { FrontMatter } from '@/types/post';
import styles from './PageContent.module.scss';

type Props = { frontMatter: FrontMatter; content: string };

const PageContent = ({ frontMatter, content }: Props) => {
  return (
    <Flex direction="column" w="100%" pos="relative" mb={20}>
      <Title order={1} className={styles.title}>
        {frontMatter.title}
      </Title>
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
