import Link from 'next/link';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import ThemeSwitch from './ThemeSwitch';

import { LINKS } from '@/constants/links';

const GNB = () => {
  return (
    <header className="flex items-center h-[60px] md:h-[92px] bg-white shadow-header border-b-grey-200 p-[20px] fixed w-full z-10 dark:bg-grey-900">
      <nav className="flex justify-between w-full">
        <ul className="flex items-center">
          <li>
            <Link
              href={LINKS.HOME}
              className="text-xl font-bold sm:text-2xl md:text-3xl hover:text-primary-500 dark:text-white dark:hover:text-primary-500">
              HIGHJOON.DEV
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-[5px] md:gap-[20px]">
          <li className="flex items-center">
            <ThemeSwitch />
          </li>
          <li>
            <Link href={LINKS.GITHUB} target="_blank">
              <AiFillGithub className="text-[30px] md:text-[40px] lg:text-[50px] hover:text-primary-500 dark:text-white dark:hover:text-primary-500" />
            </Link>
          </li>
          <li>
            <Link href={LINKS.LINKED_IN} target="_blank">
              <AiFillLinkedin className="text-[30px] md:text-[40px] lg:text-[50px] hover:text-primary-500 dark:text-white dark:hover:text-primary-500" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
