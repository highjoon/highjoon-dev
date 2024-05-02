import { Metadata } from 'next';
import Image from 'next/image';
import { Box, Flex, Title } from '@mantine/core';
import fs from 'fs';
import path from 'path';
import Comments from '@/components/blogs/Comments';
import { MdxComponents } from '@/components/blogs/mdxComponents/MdxComponents';
import MDXContent from '@/components/blogs/mdxContent/MDXContent';
import { BLOG_CONTENTS_DIR } from '@/constants/blogPosts';
import getBlogPost from '@/utils/getBlogPost';
import styles from './page.module.scss';

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(BLOG_CONTENTS_DIR));

  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));

  return paths;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const blog = getBlogPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  };
}

export default function Page({ params }: any) {
  const { frontMatter, content } = getBlogPost(params);

  return (
    <>
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
      <Comments />
    </>
  );
}
