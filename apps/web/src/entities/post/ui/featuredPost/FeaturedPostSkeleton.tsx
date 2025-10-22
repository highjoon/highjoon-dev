import React from 'react';
import { Flex, Skeleton, Title } from '@mantine/core';

export default function FeaturedPostSkeleton() {
  return (
    <Flex direction="column" gap={30}>
      <Title component="h2" order={2}>
        FEATURED POST
      </Title>
      <Skeleton radius="md" h={300} style={{ gap: 20, padding: 'var(--mantine-spacing-lg)' }}>
        <Skeleton height={200} width="100%" mb={20} />
        <Skeleton height={24} width="80%" mb={10} />
        <Skeleton height={16} width="60%" mb={10} />
        <Skeleton height={16} width="30%" />
      </Skeleton>
    </Flex>
  );
}
