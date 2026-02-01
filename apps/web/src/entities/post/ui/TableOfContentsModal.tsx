'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@highjoon-dev/ui/components/Button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@highjoon-dev/ui/components/Sheet';
import { List } from 'lucide-react';

import { type Heading } from '@/entities/post/lib/toc/extractHeadings';

interface Props {
  headings: Heading[];
}

export default function TableOfContentsModal({ headings }: Props) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' },
    );

    headings.forEach((heading) => {
      const element = document.querySelector(`#${CSS.escape(heading.id)}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    setOpen(false);
    setActiveId(id);
    setTimeout(() => {
      document.querySelector(`#${CSS.escape(id)}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const getPaddingClass = (level: number) => {
    const paddingMap: Record<number, string> = {
      1: 'pl-2',
      2: 'pl-4',
      3: 'pl-6',
      4: 'pl-8',
      5: 'pl-10',
      6: 'pl-12',
    };
    return paddingMap[level] || 'pl-0';
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full shadow-lg w-14 h-14">
            <List className="w-6 h-6" />
            <span className="sr-only">Table of Contents</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Table of Contents</SheetTitle>
            <SheetDescription className="sr-only">Navigate to different sections of this post</SheetDescription>
          </SheetHeader>
          <nav className="mt-6">
            <ul className="flex flex-col gap-2 text-sm list-none border-l border-slate-200 dark:border-slate-800">
              {headings.map((heading) => (
                <li key={heading.id} className={`-ml-[1px] ${getPaddingClass(heading.level)}`}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`block w-full py-2 text-left transition-all border-l-2 ${
                      activeId === heading.id
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
                    }`}>
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
