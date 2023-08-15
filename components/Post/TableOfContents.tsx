'use client';

import Link from 'next/link';

import useToc from '@/hooks/useTOC';

const TableOfContents = () => {
  const { tocElements, handleClickTocLink, activeTocId } = useToc();

  return (
    <ul
      className="fixed flex flex-col overflow-y-scroll border-l-2 border-grey-600"
      style={{
        margin: 0,
        paddingLeft: '15px',
        paddingRight: '15px',
        maxHeight: 'calc(100vh - 200px)',
      }}>
      {tocElements.length > 0
        ? tocElements.map((element, index) => (
            <li key={String(element) + index} className="py-1 text-sm list-none" style={{ margin: 0, paddingLeft: 0 }}>
              <Link
                href={`#${element.id}`}
                onClick={handleClickTocLink}
                className={`${
                  element.id === activeTocId ? 'text-primary-500' : 'text-grey-600'
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
