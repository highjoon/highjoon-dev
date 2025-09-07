import React from 'react';
import { Flex, Skeleton, Title } from '@mantine/core';

import styles from './loading.module.scss';

export default function Loading() {
  return (
    <Flex direction="column" gap={100}>
      <Flex direction="column" gap={30}>
        <Title component="h1" order={3}>
          POSTS
        </Title>
        <ul className={styles['card-list']}>
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index} className={styles.card}>
              <Skeleton radius="md" h="100%" style={{ gap: 20, padding: 'var(--mantine-spacing-lg)' }}>
                <Skeleton height={200} width="100%" mb={20} />
                <Skeleton height={24} width="80%" mb={10} />
                <Skeleton height={16} width="60%" mb={10} />
                <Skeleton height={16} width="30%" />
              </Skeleton>
            </li>
          ))}
        </ul>
      </Flex>

      <Skeleton height={36} width={200} mx="auto" />
    </Flex>
  );
}
