'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Autocomplete, Avatar, Burger, em, Flex, Group, rem, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import classNames from 'classnames';
import ThemeSwitch from '@/components/Common/themeSwitch/ThemeSwitch';
import { ROUTES } from '@/constants/routes';
import { posts } from '@/data/posts';
import { searchOptionsFilter } from '@/utils/searchOptionsFilter';
import styles from './Header.module.scss';

const links = [
  { link: ROUTES.HOME, label: 'HOME' },
  { link: ROUTES.PAGES + '/1', label: 'POSTS' },
  { link: ROUTES.TAGS, label: 'TAGS' },
  { link: ROUTES.ABOUT, label: 'ABOUT' },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isTablet = useMediaQuery(`(min-width: ${em(576)}) and (max-width: ${em(768)})`);

  const link = links.map((link) => {
    const isActive = link.link === ROUTES.HOME ? pathname === ROUTES.HOME : pathname.includes(link.link);

    return (
      <Link key={link.label} href={link.link} className={classNames(styles.link, { [styles.active]: isActive })}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={styles.header}>
      <Flex className={styles.inner} justify="space-between" align="center">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Link href={ROUTES.HOME}>
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
          <Group ml={50} gap={5} className={styles.links} visibleFrom="sm">
            {link}
          </Group>
          <Autocomplete
            placeholder="Search"
            leftSection={<BsSearch style={{ width: rem(16), height: rem(16), stroke: '1.5' }} />}
            data={posts.map((post) => post.title)}
            visibleFrom="md"
            filter={searchOptionsFilter}
            comboboxProps={{ shadow: 'md', transitionProps: { transition: 'fade-down', duration: 200 } }}
            leftSectionPointerEvents="none"
            onOptionSubmit={(option) => {
              const link = posts.find((post) => post.title === option)?.fileName;
              router.push(`/blogs/${link}`);
            }}
          />
          <ThemeSwitch />
        </Group>
      </Flex>
    </header>
  );
};

export default Header;
