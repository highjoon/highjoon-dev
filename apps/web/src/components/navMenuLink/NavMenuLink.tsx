import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import { ROUTES } from '@/constants/routes';

import styles from './NavMenuLink.module.scss';

const links = [
  { link: ROUTES.HOME, label: 'HOME' },
  { link: ROUTES.PAGES + '/1', label: 'POSTS' },
  // { link: ROUTES.TAGS, label: 'TAGS' },
  { link: ROUTES.ABOUT, label: 'ABOUT' },
];

type Props = {
  opened: boolean;
  close: () => void;
};

const NavMenuLink = ({ opened, close }: Props) => {
  const pathname = usePathname();

  return links.map((link) => {
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
};

export default NavMenuLink;
