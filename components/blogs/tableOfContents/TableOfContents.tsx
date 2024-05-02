'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { useToc } from '@/hooks/useToc';
import { Group, rem, Box, Text } from '@mantine/core';
import { useState } from 'react';
import styles from './TableOfContents.module.scss';

const TableOfContents = () => {
  const { tocElements, handleClickTocLink, activeTocId } = useToc();

  const items = tocElements?.map((element, index) => (
    <Box<'a'>
      component="a"
      onClick={handleClickTocLink}
      href={`#${element.id}`}
      key={String(element) + index}
      className={classNames(styles.link, { [styles.linkActive]: element.id === activeTocId })}
      style={{ paddingLeft: `calc(${index} * var(--mantine-spacing-md))` }}>
      {element.innerHTML}
    </Box>
  ));

  return (
    <div className={styles.root}>
      <Group mb="md">
        {/* <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} /> */}
        <Text>Table of contents</Text>
      </Group>
      <div className={styles.links}>
        <div
          className={styles.indicator}
          style={{
            transform: `translateY(calc(${1} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        {items}
      </div>
    </div>
  );
};

export default TableOfContents;

/* <ul
      className="flex flex-col overflow-y-scroll border-l-2 border-grey-600 dark:border-grey-200"
      style={{
        margin: 0,
        paddingLeft: '15px',
        paddingRight: '15px',
        maxHeight: 'calc(100vh - 200px)',
      }}>
     {tocElements.length > 0
        ? tocElements.map((element, index) => (
            <li
              key={String(element) + index}
              className={'py-1 text-sm list-none'}
              style={{ margin: 0, paddingLeft: 0 }}>
              <Link
                href={`#${element.id}`}
                onClick={handleClickTocLink}
                className={classNames(
                  `${
                    element.id === activeTocId ? 'text-primary-500' : 'text-grey-600 dark:text-grey-200'
                  } py-1 w-fit cursor-pointer transition-all duration-75 no-underline`,
                  `${element.tagName === 'H3' ? 'pl-3' : ''}`,
                  `${element.tagName === 'H4' ? 'pl-8' : ''}`,
                )}>
                {element.innerHTML}
              </Link>
            </li>
          ))
        : null} 
    </ul>*/
