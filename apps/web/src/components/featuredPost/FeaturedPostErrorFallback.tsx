'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Flex, Text } from '@mantine/core';
import { AiOutlineExclamationCircle, AiOutlineReload } from 'react-icons/ai';

import styles from './FeaturedPostErrorFallback.module.scss';

export default function FeaturedPostErrorFallback() {
  const router = useRouter();

  return (
    <Card className={styles.banner} shadow="md" radius="md" withBorder>
      <Flex className={styles['banner-image']} pos="relative" w="100%" align="center" justify="center">
        <Flex direction="column" align="center" gap="md">
          <AiOutlineExclamationCircle size={48} color="var(--mantine-color-red-6)" />
          <Text size="lg" fw={500} ta="center">
            추천 게시물을 불러올 수 없습니다
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            잠시 후 다시 시도해주세요
          </Text>
          <Button leftSection={<AiOutlineReload size="1rem" />} variant="outline" onClick={router.refresh}>
            다시 시도
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
