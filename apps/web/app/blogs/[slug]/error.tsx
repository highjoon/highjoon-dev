'use client';

import Link from 'next/link';
import { Button, ButtonGroup, Container, Text, Title } from '@mantine/core';

import { ROUTES } from '@/constants/routes';

import styles from '../../not-found.module.scss';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: Props) {
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
        <Button component={Link} href={ROUTES.HOME} variant="subtle" size="md">
          홈으로 돌아가기
        </Button>
      </ButtonGroup>
    </Container>
  );
}
