'use client';

import Link from 'next/link';
import { LINKS } from '@/constants/links';
import { Avatar, em, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

import styles from './Footer.module.scss';

const Footer = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(576)})`);
  const isTablet = useMediaQuery(`(min-width: ${em(576)}) and (max-width: ${em(768)})`);

  return (
    <Flex component="footer" className={styles.footer} w="100%" justify="center">
      <Flex className={styles.container} align="center" justify="space-between" gap={10} w="100%">
        <Flex align="center" gap={10}>
          <Avatar
            src="/images/img-profile.png"
            bg="grey"
            alt="img-profile"
            size={isMobile ? 'sm' : 'md'}
            visibleFrom="xs"
          />
          <Flex direction="column" justify="center">
            <Text
              className={styles['profile-wrapper']}
              component="div"
              tt="uppercase"
              fw={900}
              fz={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'grape', deg: 100 }}>
              <Avatar
                src="/images/img-profile.png"
                bg="grey"
                alt="img-profile"
                size={isMobile ? 'sm' : 'md'}
                hiddenFrom="xs"
              />
              highjoon-dev
            </Text>
            <Text component="p" className={styles.text}>
              highjoon 2023. All Rights Reserved.
            </Text>
          </Flex>
        </Flex>
        <Flex className={styles['info-wrapper']} component="ul" align="center" gap={10} c="gray.7">
          <li>
            <Link href={LINKS.GITHUB} target="_blank">
              <AiFillGithub className={styles.icon} />
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href={LINKS.LINKED_IN} target="_blank">
              <AiFillLinkedin className={styles.icon} />
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href={LINKS.MAIL_TO} target="_blank">
              <AiFillMail className={styles.icon} />
            </Link>
          </li>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
