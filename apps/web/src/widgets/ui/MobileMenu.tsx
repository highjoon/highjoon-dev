'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@highjoon-dev/ui/components/Avatar';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@highjoon-dev/ui/components/Sheet';
import { MenuIcon } from 'lucide-react';

import { ROUTES } from '@/shared/routes/routes';
import { navigationItems } from '@/widgets/model/navigation';
import SearchBar from '@/widgets/ui/SearchBar';
import ThemeSwitch from '@/widgets/ui/ThemeSwitch';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onOpenChange, onClose }: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <MenuIcon className="w-4 h-4" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="max-h-screen overflow-auto">
        <SheetHeader>
          <SheetTitle>
            <Link href={ROUTES.HOME} className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/images/img-profile.png" alt="profile" />
                <AvatarFallback>HJ</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold tracking-tighter text-transparent bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text">
                highjoon-dev
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-4">
          <div className="flex flex-col gap-6 mt-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="font-medium transition-colors hover:text-primary"
                onClick={onClose}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <div className="w-full">
              <SearchBar onClickPost={onClose} />
            </div>
            <div className="flex justify-center">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
