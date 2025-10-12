import React from 'react';
import Link from 'next/link';
import { Button, ButtonGroup, Flex, Text } from '@mantine/core';
import { AiOutlineExclamationCircle, AiOutlineHome, AiOutlineReload } from 'react-icons/ai';

import { ROUTES } from '@/shared/routes/routes';

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <Flex direction="column" gap={30}>
      <Flex direction="column" align="center" gap="md" py={60}>
        <AiOutlineExclamationCircle size={48} color="var(--mantine-color-red-6)" />
        <Text size="lg" fw={500} ta="center">
          문제가 발생했습니다
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          잠시 후 다시 시도해주세요
        </Text>
        {error?.message && (
          <Text size="sm" c="dimmed" ta="center">
            {error.message}
          </Text>
        )}
        <ButtonGroup>
          <Button leftSection={<AiOutlineReload size="1rem" />} variant="outline" onClick={reset}>
            다시 시도
          </Button>
          <Button leftSection={<AiOutlineHome size="1rem" />} component={Link} href={ROUTES.HOME} variant="outline">
            HOME
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
