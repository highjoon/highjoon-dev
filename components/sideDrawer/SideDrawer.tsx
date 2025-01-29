import React from 'react';
import { Divider, Drawer, Flex } from '@mantine/core';

import NavMenuLink from '../navMenuLink/NavMenuLink';
import SearchBar from '../searchBar/SearchBar';

type Props = { opened: boolean; onClose: () => void };

const SideDrawer = ({ opened, onClose }: Props) => {
  return (
    <Drawer opened={opened} onClose={onClose} size="100%">
      <Flex direction="column" gap={20}>
        <SearchBar onClickPost={onClose} />
        <Divider />
        <Flex direction="column" gap={5}>
          <NavMenuLink opened={opened} close={onClose} />
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default SideDrawer;
