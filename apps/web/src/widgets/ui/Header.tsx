'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@highjoon-dev/ui/components/NavigationMenu';

import { ROUTES } from '@/shared/routes/routes';
import { navigationItems } from '@/widgets/model/navigation';
import MobileMenu from '@/widgets/ui/MobileMenu';
import SearchBar from '@/widgets/ui/SearchBar';
import ThemeSwitch from '@/widgets/ui/ThemeSwitch';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <section className="sticky top-0 z-50 py-4 border-b bg-background border-border min-h-[72px]">
      <div className="container max-w-6xl px-4 mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/images/img-profile.png" alt="profile" />
              <AvatarFallback>HJ</AvatarFallback>
            </Avatar>
            <span className="text-lg font-semibold tracking-tighter text-transparent bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text group-hover:from-slate-700 group-hover:to-slate-900 dark:group-hover:from-slate-200 dark:group-hover:to-slate-50">
              highjoon-dev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="items-center hidden gap-4 lg:flex">
            <SearchBar />
            <ThemeSwitch />
          </div>

          {/* Mobile Menu */}
          <MobileMenu isOpen={mobileMenuOpen} onOpenChange={setMobileMenuOpen} onClose={closeMobileMenu} />
        </nav>
      </div>
    </section>
  );
}
