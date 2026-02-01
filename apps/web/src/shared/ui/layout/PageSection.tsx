import React, { ReactNode } from 'react';

type MaxWidth = '4xl' | '7xl';

interface PageSectionProps {
  children: ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
  as?: 'section' | 'article';
  withContainer?: boolean;
}

const maxWidthClasses: Record<MaxWidth, string> = {
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
};

export default function PageSection({
  children,
  maxWidth = '7xl',
  className = '',
  as: Component = 'section',
  withContainer = true,
}: PageSectionProps) {
  return (
    <Component
      className={`pt-16 pb-16 md:pt-32 md:pb-32 transition-colors bg-white dark:bg-slate-950 ${className}`.trim()}>
      {withContainer ? <div className={`px-6 mx-auto ${maxWidthClasses[maxWidth]}`}>{children}</div> : children}
    </Component>
  );
}
