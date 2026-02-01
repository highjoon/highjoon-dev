import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

import { footerSections, footerSocialLinks } from '@/widgets/model/footer';

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 mb-20 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="flex items-center mb-6">
              <div className="relative flex items-center justify-center w-8 h-8 mr-3 overflow-hidden rounded-lg bg-slate-900 dark:bg-slate-800">
                <Image src="/images/img-profile.png" width={24} height={24} alt="profile" className="object-cover" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-50">HIGHJOON-DEV</span>
            </div>
            <div className="flex space-x-4">
              {footerSocialLinks.map((links) => (
                <a
                  key={links.label}
                  href={links.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-all border rounded-xl bg-slate-50 text-slate-500 border-slate-200 hover:text-indigo-600 hover:bg-white hover:border-indigo-600 hover:shadow-md dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 dark:hover:text-indigo-400 dark:hover:bg-slate-800 dark:hover:border-indigo-400">
                  {links.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px] dark:text-slate-50">
              Navigate
            </h4>
            <ul className="grid grid-cols-2 text-sm font-bold tracking-wide gap-y-4 text-slate-600 dark:text-slate-400">
              {footerSections.map((section) => (
                <li key={section.name}>
                  <Link
                    href={section.href}
                    className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest dark:border-slate-800 dark:text-slate-400">
          <p>© {dayjs().year()} HIGHJOON. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0">DESIGNED & CODED BY HIGHJOON</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
