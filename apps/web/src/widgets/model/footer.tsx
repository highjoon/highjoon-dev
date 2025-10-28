import { Github, Linkedin, Mail } from 'lucide-react';

import { LINKS } from '@/shared/model/links';
import { ROUTES } from '@/shared/routes/routes';

export interface FooterSection {
  title: string;
  links: Array<{ name: string; href: string }>;
}

export interface FooterSocialLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}

export interface FooterLegalLink {
  name: string;
  href: string;
}

export const footerSections: FooterSection[] = [
  {
    title: 'Content',
    links: [
      { name: 'Home', href: ROUTES.HOME },
      { name: 'Posts', href: `${ROUTES.PAGES}/1` },
      { name: 'About', href: ROUTES.ABOUT },
    ],
  },
];

export const footerSocialLinks: FooterSocialLink[] = [
  { icon: <Github className="size-5" />, href: LINKS.GITHUB, label: 'GitHub' },
  { icon: <Linkedin className="size-5" />, href: LINKS.LINKED_IN, label: 'LinkedIn' },
  { icon: <Mail className="size-5" />, href: LINKS.MAIL_TO, label: 'Email' },
];
