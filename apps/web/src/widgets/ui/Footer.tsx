'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';

import { ROUTES } from '@/shared/routes/routes';
import { footerSections, footerSocialLinks } from '@/widgets/model/footer';

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t bg-muted/50 border-border">
      <div className="container max-w-6xl px-4 py-16 mx-auto md:px-6">
        <div className="flex flex-col justify-between w-full gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex flex-col justify-between w-full gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-3 lg:justify-start">
              <Link href={ROUTES.HOME}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/images/img-profile.png" alt="profile" />
                  <AvatarFallback>HJ</AvatarFallback>
                </Avatar>
              </Link>
              <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text">
                highjoon-dev
              </h2>
            </div>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {footerSocialLinks.map((social) => (
                <li key={social.label} className="font-medium transition-colors hover:text-primary">
                  <Link href={social.href} target="_blank" aria-label={social.label}>
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-1 lg:gap-20">
            {footerSections.map((section) => (
              <div key={section.title} className="lg:text-right">
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="flex flex-col space-y-3 text-sm text-muted-foreground md:flex-row md:space-y-0 md:gap-4 lg:justify-end">
                  {section.links.map((link) => (
                    <li key={link.name} className="font-medium transition-colors hover:text-primary">
                      <Link href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
