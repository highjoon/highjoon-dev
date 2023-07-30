import Image from 'next/image';
import Link from 'next/link';
import GitHubLogo from 'public/images/github.png';
import LinkedInLogo from 'public/images/linkedin.png';

import { LINK } from '@/services/constants/link';

const GNB = () => {
  return (
    <header className="flex items-center h-[92px] bg-white shadow-header border-b-grey-200 p-[20px] fixed w-full z-10">
      <nav className="flex justify-between w-full">
        <ul className="flex items-center">
          <li>
            <Link href={LINK.HOME} className="text-3xl font-bold hover:text-primary-500">
              HIGHJOON.DEV
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-[20px]">
          <li>
            <Link href={LINK.GITHUB} target="_blank">
              <Image src={GitHubLogo} width={60} height={60} alt="github-logo" />
            </Link>
          </li>
          <li>
            <Link href={LINK.LINKED_IN} target="_blank">
              <Image src={LinkedInLogo} width={50} height={50} alt="linkedin-logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
