import React, { ReactNode } from 'react';

interface PageHeaderProps {
  label: string;
  title: string;
  description?: ReactNode;
  rightContent?: ReactNode;
}

export default function PageHeader({ label, title, description, rightContent }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between pb-10 mb-12 border-b md:flex-row md:items-end border-slate-200 dark:border-slate-800">
      <div>
        <div className="flex items-center mb-4 space-x-2 text-xs font-black tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
          <div className="w-8 h-[2px] bg-indigo-600 dark:bg-indigo-400" />
          <span>{label}</span>
        </div>
        <h2 className="mb-4 text-5xl italic font-black tracking-tighter uppercase md:text-7xl text-slate-900 dark:text-white">
          {title}
        </h2>
        {description && <p className="text-lg font-bold text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
