import { type Metadata } from 'next';
import Link from 'next/link';
import { Button, Container, Group, Text, Title } from '@mantine/core';

import { ROUTES } from '@/constants/routes';

import styles from './not-found.module.scss';

export const metadata: Metadata = {
  title: '비밀 장소 | highjoon-dev',
  description: '비밀 장소를 발견하셨군요!',
};

export default function NotFound() {
  return (
    <Container className={styles['not-found']}>
      <div className={styles.label}>404</div>
      <Title className={styles.title}>비밀 장소를 발견하셨군요!</Title>
      <Text c="dimmed" size="lg" ta="center" className={styles.description}>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        주소를 잘못 입력하셨거나, 페이지가 다른 위치로 이동되었을 수 있습니다.
      </Text>
      <Group justify="center">
        <Button component={Link} href={ROUTES.HOME} variant="subtle" size="md">
          홈으로 돌아가기
        </Button>
      </Group>
    </Container>
  );
}
