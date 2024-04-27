import React from 'react';
import { Divider, Drawer, Flex } from '@mantine/core';
import SearchBar from '../searchBar/SearchBar';

type Props = { opened: boolean; onClose: () => void; link: JSX.Element[] };

const SideDrawer = ({ opened, onClose, link }: Props) => {
  return (
    <Drawer opened={opened} onClose={onClose} size="100%">
      <Flex direction="column" gap={20}>
        <SearchBar onClickPost={onClose} />
        <Divider />
        <Flex direction="column" gap={5}>
          {link}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default SideDrawer;
