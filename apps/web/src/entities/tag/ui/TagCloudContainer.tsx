import React from 'react';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';

import AllTopicsButton from './AllTopicsButton';
import EmptyTagSearchState from './EmptyTagSearchState';
import TagButton from './TagButton';

interface Props {
  tags: TagWithCount[];
  searchQuery: string;
  selectedTag?: string | null;
}

export default function TagCloudContainer({ tags, searchQuery, selectedTag }: Props) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="h-32 overflow-y-auto">
        <div className="flex flex-wrap content-start gap-3 pr-2">
          <AllTopicsButton isActive={selectedTag === null || selectedTag === undefined} />
          {tags.map((tag) => (
            <TagButton key={tag.id} name={tag.name} isActive={selectedTag === tag.name} />
          ))}
          {tags.length === 0 && searchQuery && <EmptyTagSearchState searchQuery={searchQuery} />}
        </div>
      </div>
    </div>
  );
}
