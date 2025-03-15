'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Flex, Text } from '@mantine/core';
import { type Post } from '@highjoon-dev/types';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

import { increaseViewCountAction } from '@/actions/post';

type Props = {
  slug: Post['slug'];
  viewCount: Post['viewCount'];
};

const ViewCount = ({ viewCount, slug }: Props) => {
  const isFirstRender = useRef(false);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      return;
    }

    increaseViewCountAction(slug);
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
};

export default ViewCount;
