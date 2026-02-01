import React from 'react';
import { Tag } from 'lucide-react';

interface Props {
  selectedTag: string | null;
  postCount: number;
}

export default function FilteredPostsHeader({ selectedTag, postCount }: Props) {
  return (
    <div className="flex items-end justify-between mb-8">
      <h3 className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
        {selectedTag ? (
          <>
            <Tag className="text-indigo-600 dark:text-indigo-400" size={28} />
            <span className="text-indigo-600 dark:text-indigo-400">#{selectedTag}</span>
            <span>관련 글</span>
          </>
        ) : (
          <span>전체 글 목록</span>
        )}
        <span className="px-2 py-1 ml-2 text-sm font-bold rounded-lg text-slate-400 bg-slate-100 dark:bg-slate-800">
          {postCount}
        </span>
      </h3>
    </div>
  );
}
