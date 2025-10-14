'use client';

import React from 'react';
import { Flex, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { useIncreaseViewCount } from '@/entities/post/lib/viewCount/useIncreaseViewCount';

type Props = {
  slug: Post['slug'];
  viewCount: Post['viewCount'];
};

export default function ViewCount({ viewCount, slug }: Props) {
  useIncreaseViewCount({ slug });

  return (
    <Flex justify="center" gap={10}>
      <MdOutlineRemoveRedEye size={23} />
      <Text component="span" h={25}>
        {viewCount?.toLocaleString()}
      </Text>
    </Flex>
  );
}
