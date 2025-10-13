'use client';

import React, { useEffect, useRef } from 'react';
import { Flex, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/prisma';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { increaseViewCountAction } from '@/features/increaseViewCount/lib/increaseViewCountAction';

type Props = {
  slug: Post['slug'];
  viewCount: Post['viewCount'];
};

export default function ViewCount({ viewCount, slug }: Props) {
  const isFirstRender = useRef(false);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    increaseViewCountAction({ slug });
    isFirstRender.current = true;
  }, [slug]);

  return (
    <Flex justify="center" gap={10}>
      <MdOutlineRemoveRedEye size={23} />
      <Text component="span" h={25}>
        {viewCount?.toLocaleString()}
      </Text>
    </Flex>
  );
}
