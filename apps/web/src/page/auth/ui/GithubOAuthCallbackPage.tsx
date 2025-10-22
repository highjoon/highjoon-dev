'use client';

import { Container, Group, Loader, Paper, Stack, Text } from '@mantine/core';

import { useGithubOAuthCallback } from '@/features/auth/model/useGithubOAuthCallback';

const GithubOAuthCallbackPage = () => {
  useGithubOAuthCallback();

  return (
    <Container size="xs" py="xl">
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Stack align="center" gap="lg">
          <Group>
            <Text size="xl" fw={600}>
              GitHub 로그인
            </Text>
          </Group>

          <Loader size="lg" variant="dots" />

          <Text size="sm" c="dimmed" ta="center">
            GitHub 계정으로 로그인 중입니다...
            <br />
            잠시만 기다려주세요.
          </Text>
        </Stack>
      </Paper>
    </Container>
  );
};

export default GithubOAuthCallbackPage;
