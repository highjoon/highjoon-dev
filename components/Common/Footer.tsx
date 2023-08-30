import Link from 'next/link';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

import { LINKS } from '@/services/constants/links';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-3 py-3 md:py-7">
      <ul className="flex items-center justify-center gap-3 text-grey-600 dark:text-white">
        <li>
          <Link href={LINKS.GITHUB} target="_blank">
            <AiFillGithub className="text-[20px] hover:text-primary-500" />
          </Link>
        </li>
        <li>
          <Link href={LINKS.LINKED_IN} target="_blank">
            <AiFillLinkedin className="text-[20px] hover:text-primary-500" />
          </Link>
        </li>
        <li>
          <Link href={LINKS.MAIL_TO} target="_blank">
            <AiFillMail className="text-[20px] hover:text-primary-500" />
          </Link>
        </li>
      </ul>
      <ul className="flex items-center justify-center gap-2 text-grey-600 dark:text-white">
        <li>highJoon</li>
        <li>|</li>
        <li>2023</li>
      </ul>
    </footer>
  );
};

export default Footer;
