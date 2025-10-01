'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Flex, Text, Title } from '@mantine/core';
import { AiOutlineExclamationCircle, AiOutlineReload } from 'react-icons/ai';

export default function LatestPostsErrorFallback() {
  const router = useRouter();

  return (
    <Flex direction="column" gap={30}>
      <Title component="h1" order={3}>
        LATEST POSTS
      </Title>
      <Flex direction="column" align="center" gap="md" py={60}>
        <AiOutlineExclamationCircle size={48} color="var(--mantine-color-red-6)" />
        <Text size="lg" fw={500} ta="center">
          게시물 목록을 불러올 수 없습니다
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          잠시 후 다시 시도해주세요
        </Text>
        <Button leftSection={<AiOutlineReload size="1rem" />} variant="outline" onClick={router.refresh}>
          다시 시도
        </Button>
      </Flex>
    </Flex>
  );
}
