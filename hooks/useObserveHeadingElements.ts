import { useEffect, useState } from 'react';

import { getIntersectionObserver } from '@/services/utils/getIntersectionObserver';

const useObserveHeadingElements = () => {
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;
    const headingElements = Array.from(article.querySelectorAll('h2, h3, h4'));
    setHeadingElements(headingElements);
    setActiveId(headingElements[0].id);
    const observer = getIntersectionObserver(setActiveId);
    headingElements.map((element) => observer.observe(element));
  }, []);

  return { headingElements, activeId };
};

export default useObserveHeadingElements;
