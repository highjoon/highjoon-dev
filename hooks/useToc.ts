import { useCallback, useEffect, useState } from 'react';
import { GNB_HEIGHT } from '@/constants/blogPosts';
import { getIntersectionObserver } from '@/utils/getIntersectionObserver';

export const useToc = () => {
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
    const article = document.querySelector('#page-content');
    if (!article) return;
    const headingElements = Array.from(article.querySelectorAll('h2, h3, h4'));
    setHeadingElements(headingElements);
    setActiveId(headingElements[0].id);
    const observer = getIntersectionObserver(setActiveId);
    headingElements.map((element) => observer.observe(element));
  }, []);

  return {
    tocElements: headingElements,
    activeTocId: activeId,
    handleClickTocLink: handleClickLink,
  };
};
