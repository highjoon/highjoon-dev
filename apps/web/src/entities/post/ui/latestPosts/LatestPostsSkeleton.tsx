import React from 'react';
import { Flex, Skeleton, Title } from '@mantine/core';

import styles from './LatestPostsSkeleton.module.scss';

export default function LatestPostsSkeleton() {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h2" order={2}>
        LATEST POSTS
      </Title>
      <ul className={styles['card-list']}>
        {Array.from({ length: 6 }).map((_, index) => (
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
  );
}
