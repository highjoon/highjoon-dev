'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { GNB_HEIGHT } from '@/services/constants/blogPosts';
import { getIntersectionObserver } from '@/services/utils/getIntersectionObserver';

const TableOfContents = () => {
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState('');

  const handleClickLink = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.getAttribute('href');
    if (!targetId) return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const yOffset = GNB_HEIGHT * -1;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    event.preventDefault();
  }, []);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;
    const headingElements = Array.from(article.querySelectorAll('h2, h3, h4'));
    setHeadingElements(headingElements);
    setActiveId(headingElements[0].id);
    const observer = getIntersectionObserver(setActiveId);
    headingElements.map((element) => observer.observe(element));
  }, []);

  return (
    <ul
      className="fixed flex flex-col overflow-y-scroll border-l-2 border-grey-600"
      style={{
        margin: 0,
        paddingLeft: '15px',
        paddingRight: '15px',
        maxHeight: 'calc(100vh - 200px)',
      }}>
      {headingElements.length > 0
        ? headingElements.map((element, index) => (
            <li key={String(element) + index} className="py-1 text-sm list-none" style={{ margin: 0, paddingLeft: 0 }}>
              <Link
                href={`#${element.id}`}
                onClick={handleClickLink}
                className={`${
                  element.id === activeId ? 'text-primary-500' : 'text-grey-600'
                } py-1 w-fit cursor-pointer transition-all duration-75 no-underline`}>
                {element.innerHTML}
              </Link>
            </li>
          ))
        : null}
    </ul>
  );
};

export default TableOfContents;
