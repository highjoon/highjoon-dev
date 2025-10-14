import React from 'react';
import { Box, Flex, Group, Skeleton } from '@mantine/core';

import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <Flex direction="column" w="100%" pos="relative" mb={20}>
      {/* 제목 스켈레톤 */}
      <Skeleton height={48} width="80%" mb={40} className={styles.title} />

      {/* 조회수 스켈레톤 */}
      <Group className={styles['view-count']} gap="lg" align="center">
        <Skeleton height={20} width={100} />
      </Group>

      {/* 배너 이미지 스켈레톤 */}
      <Box className={styles.banner} pos="relative" w="100%">
        <Skeleton height="100%" width="100%" />
      </Box>

      {/* 콘텐츠 스켈레톤 */}
      <Flex id="page-content" direction="column" mt={20}>
        {/* 여러 줄의 콘텐츠 스켈레톤 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} height={index % 3 === 0 ? 24 : 16} width={index % 3 === 0 ? '90%' : '100%'} mb={16} />
        ))}
      </Flex>

      {/* 좋아요 및 댓글 섹션 스켈레톤 */}
      <Group justify="center" align="center" mt={20} mb={20}>
        <Skeleton height={40} width={120} />
        <Skeleton height={40} width={120} />
      </Group>
    </Flex>
  );
}
