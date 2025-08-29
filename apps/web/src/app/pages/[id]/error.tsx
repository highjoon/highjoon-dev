'use client';

import React from 'react';
import { Button, Flex, Text, Title } from '@mantine/core';
import { AiOutlineExclamationCircle, AiOutlineReload } from 'react-icons/ai';

type Props = {
  reset: () => void;
};

export default function Error({ reset }: Props) {
  return (
    <Flex direction="column" gap={100}>
      <Flex direction="column" gap={30}>
        <Title component="h1" order={3}>
          POSTS
        </Title>
        <Flex direction="column" align="center" gap="md" py={60}>
          <AiOutlineExclamationCircle size={48} color="var(--mantine-color-red-6)" />
          <Text size="lg" fw={500} ta="center">
            문제가 발생했습니다
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            잠시 후 다시 시도해주세요
          </Text>
          <Button leftSection={<AiOutlineReload size="1rem" />} variant="outline" onClick={reset}>
            다시 시도
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
