'use client';

import { Button, ButtonGroup, Container, Text, Title } from '@mantine/core';

import styles from './not-found.module.scss';

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalErrorPage({ reset }: Props) {
  return (
    <Container className={styles['not-found']}>
      <Title className={styles.title}>문제가 발생했습니다!</Title>
      <Text c="dimmed" size="lg" ta="center" className={styles.description}>
        잠시 후 다시 시도해주세요.
      </Text>
      <ButtonGroup style={{ justifyContent: 'center' }}>
        <Button variant="subtle" size="md" onClick={reset}>
          새로고침
        </Button>
      </ButtonGroup>
    </Container>
  );
}
