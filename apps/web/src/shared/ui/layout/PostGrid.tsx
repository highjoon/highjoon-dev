import React, { ReactNode } from 'react';

interface PostGridProps {
  children: ReactNode;
  className?: string;
}

export default function PostGrid({ children, className = '' }: PostGridProps) {
  return (
    <ul className={`grid grid-cols-1 gap-10 mb-20 md:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}>{children}</ul>
  );
}
