import { useCallback } from 'react';

import { GNB_HEIGHT } from '@/services/constants/blogPosts';

const useClickTocLink = () => {
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

  return { handleClickLink };
};

export default useClickTocLink;
