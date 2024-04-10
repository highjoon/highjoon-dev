import link from 'next/link';
import router from 'next/router';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Autocomplete, Divider, Drawer, Flex, rem } from '@mantine/core';
import { posts } from '@/data/posts';
import { searchOptionsFilter } from '@/utils/searchOptionsFilter';

type Props = { opened: boolean; onClose: () => void; link: JSX.Element[] };

const SideDrawer = ({ opened, onClose, link }: Props) => {
  return (
    <Drawer opened={opened} onClose={onClose} size="100%">
      <Flex direction="column" gap={20}>
        <Autocomplete
          placeholder="Search"
          leftSection={<BsSearch style={{ width: rem(16), height: rem(16), stroke: '1.5' }} />}
          data={posts.map((post) => post.title)}
          filter={searchOptionsFilter}
          comboboxProps={{ shadow: 'md', transitionProps: { transition: 'fade-down', duration: 200 } }}
          leftSectionPointerEvents="none"
          onOptionSubmit={(option) => {
            const link = posts.find((post) => post.title === option)?.fileName;
            router.push(`/blogs/${link}`);
          }}
        />
        <Divider />
        <Flex direction="column" gap={5}>
          {link}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default SideDrawer;
