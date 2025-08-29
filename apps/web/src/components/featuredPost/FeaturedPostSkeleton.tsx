'use client';

import React from 'react';
import { Card, Flex, Skeleton } from '@mantine/core';

import styles from './FeaturedPostSkeleton.module.scss';

export default function FeaturedPostSkeleton() {
  return (
    <Card className={styles.banner} shadow="md" radius="md" withBorder>
      <Flex className={styles['banner-image']} pos="relative" w="100%">
        <Card.Section>
          <Skeleton className={styles.image} />
        </Card.Section>
        <Card className={styles.info} shadow="md" radius="md" withBorder pos="absolute" bottom={-90}>
          <Skeleton height={24} width="80%" mb={10} />
          <Skeleton height={16} width="60%" mb={10} />
          <Skeleton height={16} width="30%" />
        </Card>
      </Flex>
    </Card>
  );
}
