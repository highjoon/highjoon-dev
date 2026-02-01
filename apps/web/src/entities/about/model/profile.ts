import { Github, Linkedin, type LucideIcon, Mail } from 'lucide-react';

import { LINKS } from '@/shared/model/links';

export interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
  isExternal: boolean;
}

export const PROFILE = {
  name: '윤상준',
  role: 'Frontend Developer',
  location: 'Seoul, Korea',
  taglines: [
    { prefix: '', text: '더 나은 경험', highlight: 'indigo' as const, suffix: '을 위해 끊임없이 고민합니다.' },
    { prefix: '기술로 ', text: '의미 있는 변화', highlight: 'pink' as const, suffix: '를 만듭니다.' },
  ],
  image: {
    src: '/images/img-profile.png',
    alt: '윤상준 프로필 사진',
  },
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: LINKS.MAIL_TO,
    label: 'Email',
    icon: Mail,
    isExternal: true,
  },
  {
    href: LINKS.GITHUB,
    label: 'Github',
    icon: Github,
    isExternal: true,
  },
  {
    href: LINKS.LINKED_IN,
    label: 'Linkedin',
    icon: Linkedin,
    isExternal: true,
  },
];
