'use client';

import React from 'react';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import TagCloudContainer from '@/entities/tag/ui/TagCloudContainer';
import { TagSearchInput, useTagSearch } from '@/features/filterTagsBySearch';

interface Props {
  tags: TagWithCount[];
  selectedTag?: string | null;
}

export default function TagPosts({ tags, selectedTag }: Props) {
  const { searchQuery, setSearchQuery, filteredTags } = useTagSearch(tags);

  return (
    <div>
      <TagSearchInput value={searchQuery} onChange={setSearchQuery} />
      <TagCloudContainer tags={filteredTags} searchQuery={searchQuery} selectedTag={selectedTag} />
    </div>
  );
}
