import Link from 'next/link';
import { Badge, Flex, Text, Title } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import { ROUTES } from '@/constants/routes';
import countTags from '@/utils/countTags';
import getAllTagsFromPosts from '@/utils/getAllTagsFromPosts';

export async function generateMetadata() {
  return {
    title: 'Tags | highjoon-dev',
  };
}

export default async function Page() {
  const allTags = getAllTagsFromPosts();
  const tagCountsArray = countTags(allTags);

  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        TAGS
      </Title>
      <Flex gap={10} wrap="wrap">
        {tagCountsArray.map((tagCount) => {
          const tag = Object.keys(tagCount)[0];
          const count = tagCount[tag];
          return (
            <Link key={uuid() + tag} href={ROUTES.TAGS + `/${tag}/1`}>
              <Badge variant="outline" size="lg">
                #&nbsp;{tag}&nbsp;
                <Text component="span" fw="inherit" fz="inherit" lh="inherit">
                  {count}
                </Text>
              </Badge>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
