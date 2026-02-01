import React from 'react';

interface Props {
  searchQuery: string;
}

export default function EmptyTagSearchState({ searchQuery }: Props) {
  return (
    <div className="w-full text-sm font-bold text-center h-ull text-slate-400 dark:text-slate-500">
      &quot;{searchQuery}&quot;와 일치하는 태그가 없습니다.
    </div>
  );
}
