'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@highjoon-dev/ui/components/Sheet';
import { Search } from 'lucide-react';

import ThemeToggle from '@/features/theme/ui/ThemeToggle';
import { type NavigationItem } from '@/widgets/model/navigation';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navigationItems: NavigationItem[];
  onSearchClick: () => void;
}

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`) || pathname.startsWith(href.replace(/\/\d+$/, ''));
}

export default function HeaderMobileMenu({
  isOpen,
  onOpenChange,
  navigationItems,
  onSearchClick,
}: HeaderMobileMenuProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-auto px-6 py-4 border-b border-slate-300 dark:border-slate-800">
        <SheetHeader className="w-4/5 p-0">
          <div className="flex justify-between gap-3">
            <Button onClick={onSearchClick} variant="outline" className="justify-start w-full mb-4 space-x-3">
              <Search size={18} />
              <span className="text-xs font-bold tracking-widest uppercase">Search</span>
            </Button>

            <ThemeToggle />
          </div>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          {navigationItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`text-lg font-bold ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-800 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-indigo-400'
                }`}
                onClick={() => onOpenChange(false)}>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
