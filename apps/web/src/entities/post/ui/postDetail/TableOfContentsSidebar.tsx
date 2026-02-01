'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

import { type Heading } from '@/entities/post/lib/toc/extractHeadings';

interface Props {
  headings: Heading[];
}

export default function TableOfContentsSidebar({ headings }: Props) {
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

  if (!headings || headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(`#${CSS.escape(id)}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  const getPaddingClass = (level: number) => {
    const paddingMap: Record<number, string> = {
      1: 'pl-4',
      2: 'pl-4',
      3: 'pl-8',
      4: 'pl-12',
      5: 'pl-16',
      6: 'pl-20',
    };
    return paddingMap[level] || 'pl-4';
  };

  return (
    <nav className="space-y-4">
      <h4 className="flex items-center gap-2 mb-4 text-xs font-black tracking-widest uppercase text-vibrant-text-muted">
        <List size={14} />
        On this page
      </h4>
      <ul className="space-y-3 border-l border-slate-200 dark:border-slate-800">
        {headings.map((heading) => (
          <li key={heading.id} className="-ml-[1px]">
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block ${getPaddingClass(heading.level)} text-sm transition-all border-l-2 ${
                activeId === heading.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
