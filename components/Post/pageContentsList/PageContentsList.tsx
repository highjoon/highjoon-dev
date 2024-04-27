'use client';

import { useRouter } from 'next/navigation';
import { Badge, Button, Image } from '@mantine/core';
import { Card, Flex, Group, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { Post } from '@/types/post';
import createPostPath from '@/utils/createPostPath';
import styles from './PageContentsList.module.scss';

type Props = {
  posts: Post[][];
};

const PageContentsList = ({ posts }: Props) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      <motion.ul
        className={styles['card-list']}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}>
        {posts.map((post) =>
          post.map((item, index) => (
            <li className={styles.card} key={item.title + index}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%" style={{ gap: 20 }}>
                <Group className={styles.content} onClick={() => router.push(createPostPath(item.fileName))}>
                  <Card.Section>
                    <Image src={item.bannerImg} height={160} alt={item.title} />
                  </Card.Section>
                  <Group gap={10}>
                    <Flex className={styles.title} w="100%" h={50} align="center">
                      <Text fw={500}>{item.title}</Text>
                    </Flex>
                    <Flex className={styles.description} w="100%" h={40}>
                      <Text size="sm" c="dimmed">
                        {item.description}
                      </Text>
                    </Flex>
                    <Text size="sm" c="dimmed">
                      {item.date}
                    </Text>
                  </Group>
                </Group>
                <Flex className={styles['hashtag-list']} gap={5}>
                  {item.tags.map((tag) => (
                    <Badge key={tag} className={styles.hashtag} onClick={() => router.push(`${ROUTES.TAGS}/${tag}/1`)}>
                      #{tag}
                    </Badge>
                  ))}
                </Flex>
              </Card>
            </li>
          )),
        )}
      </motion.ul>
      <Flex w="100%" justify="center" align="center">
        <Button variant="default" onClick={() => router.push(`${ROUTES.PAGES}/1`)}>
          게시물 전체 보기
        </Button>
      </Flex>
    </AnimatePresence>
  );
};

export default PageContentsList;
