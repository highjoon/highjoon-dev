'use client';

import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

import ThemeToggle from '@/features/theme/ui/ThemeToggle';
import { LINKS } from '@/shared/model/links';
import Logo from '@/shared/ui/Logo';
import Navigation from '@/shared/ui/Navigation';
import { navigationItems } from '@/widgets/model/navigation';

import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import SearchDialog from './SearchDialog';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full transition-colors border-b border-slate-300 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <Navigation items={navigationItems} />

          <div className="items-center hidden space-x-4 md:flex">
            <SearchBar
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
            />

            <ThemeToggle />

            <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800" />
            <a
              href={LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
              <Github size={20} />
            </a>
          </div>

          <MobileMenu
            isOpen={isMenuOpen && !isSearchOpen}
            onOpenChange={setIsMenuOpen}
            navigationItems={navigationItems}
            onSearchClick={() => {
              setIsSearchOpen(true);
              setIsMenuOpen(false);
            }}
          />
        </div>
      </div>
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
