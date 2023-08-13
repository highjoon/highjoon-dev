'use client';

import Link from 'next/link';

import useClickTocLink from '@/hooks/useClickTocLink';
import useObserveHeadingElements from '@/hooks/useObserveHeadingElements';

const TableOfContents = () => {
  const { headingElements, activeId } = useObserveHeadingElements();
  const { handleClickLink } = useClickTocLink();

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
