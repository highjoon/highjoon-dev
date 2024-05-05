'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, Burger, em, Flex, Group, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classNames from 'classnames';
import ThemeSwitch from '@/components/Common/themeSwitch/ThemeSwitch';
import { ROUTES } from '@/constants/routes';
import SearchBar from '../searchBar/SearchBar';
import SideDrawer from '../sideDrawer/SideDrawer';
import styles from './Header.module.scss';

const links = [
  { link: ROUTES.HOME, label: 'HOME' },
  { link: ROUTES.PAGES + '/1', label: 'POSTS' },
  { link: ROUTES.TAGS, label: 'TAGS' },
  { link: ROUTES.ABOUT, label: 'ABOUT' },
];

const Header = () => {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isTablet = useMediaQuery(`(min-width: ${em(576)}) and (max-width: ${em(768)})`);

  const link = links.map((link) => {
    const isActive = link.link === ROUTES.HOME ? pathname === ROUTES.HOME : pathname?.includes(link.link);

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classNames(styles.link, { [styles.active]: isActive, [styles.sidebar]: opened })}
        onClick={close}>
        {link.label}
      </Link>
    );
  });

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
              {link}
            </Group>
            <SearchBar visibleFrom="md" />
            <ThemeSwitch />
          </Group>
        </Flex>
      </Flex>
      <SideDrawer opened={opened} onClose={close} link={link} />
    </>
  );
};

export default Header;
