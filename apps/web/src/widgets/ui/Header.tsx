'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, Burger, em, Flex, Group, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { ROUTES } from '@/shared/routes';
import NavMenuLink from '@/widgets/ui/NavMenuLink';
import SearchBar from '@/widgets/ui/SearchBar';
import SideDrawer from '@/widgets/ui/SideDrawer';
import ThemeSwitch from '@/widgets/ui/ThemeSwitch';

import styles from './Header.module.scss';

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isTablet = useMediaQuery(`(min-width: ${em(576)}) and (max-width: ${em(768)})`);

  return (
    <>
      <Flex component="header" className={styles.header} justify="center">
        <Flex className={styles.inner} justify="space-between" align="center">
          <Group className={styles.title}>
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" />
            <Link className={styles['home-link']} href={ROUTES.HOME}>
              <Flex align="center" gap={10}>
                <Avatar src="/images/img-profile.png" bg="grey" alt="img-profile" size={isMobile ? 'sm' : 'md'} />
                <Text
                  tt="uppercase"
                  fw={900}
                  fz={isMobile ? 'h4' : isTablet ? 'h3' : 'h2'}
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'grape', deg: 100 }}>
                  highjoon-dev
                </Text>
              </Flex>
            </Link>
          </Group>
          <Group>
            <Group ml={50} gap={5} visibleFrom="md">
              <NavMenuLink opened={opened} close={close} />
            </Group>
            <SearchBar visibleFrom="md" />
            <ThemeSwitch />
          </Group>
        </Flex>
      </Flex>
      <SideDrawer opened={opened} onClose={close} />
    </>
  );
};

export default Header;
