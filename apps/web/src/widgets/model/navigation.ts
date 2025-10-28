import { ROUTES } from '@/shared/routes/routes';

export interface NavigationItem {
  title: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { title: 'HOME', href: ROUTES.HOME },
  { title: 'POSTS', href: `${ROUTES.PAGES}/1` },
  { title: 'ABOUT', href: ROUTES.ABOUT },
];
