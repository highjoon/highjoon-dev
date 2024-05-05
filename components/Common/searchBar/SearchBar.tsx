'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { em, Group, MantineSize, noop, UnstyledButton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Spotlight, spotlight, SpotlightActionData } from '@mantine/spotlight';
import { posts } from '@/data/posts';
import createPostPath from '@/utils/createPostPath';
import styles from './SearchBar.module.scss';

type Props = { visibleFrom?: MantineSize; onClickPost?: () => void };

const SearchBar = ({ visibleFrom, onClickPost = noop }: Props) => {
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isTablet = useMediaQuery(`(min-width: ${em(576)}) and (max-width: ${em(768)})`);
  const isDesktop = !isMobile && !isTablet;

  const router = useRouter();

  const actions: SpotlightActionData[] = posts.map((post) => {
    return {
      id: post.fileName,
      label: post.title,
      description: post.description,
      onClick: () => {
        router.push(createPostPath(post.fileName));
        onClickPost();
      },
    };
  });

  return (
    <>
      <UnstyledButton
        className={styles['search-button']}
        px="sm"
        w={isDesktop ? 200 : '100%'}
        h={34}
        visibleFrom={visibleFrom}
        c="gray.6"
        onClick={spotlight.open}>
        <Group>
          <BsSearch className={styles['search-icon']} />
          {!isTablet && '검색'}
        </Group>
      </UnstyledButton>
      <Spotlight
        size="xl"
        actions={actions}
        nothingFound="일치하는 게시물이 없습니다."
        highlightQuery
        scrollable
        searchProps={{
          leftSection: <BsSearch className={styles['search-icon']} />,
          placeholder: '검색어를 입력해주세요.',
        }}
      />
    </>
  );
};

export default SearchBar;
