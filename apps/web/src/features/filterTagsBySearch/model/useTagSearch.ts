'use client';

import { useMemo, useState } from 'react';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';

export function useTagSearch(tags: TagWithCount[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    if (!searchQuery.trim()) return tags;
    const lowerQuery = searchQuery.toLowerCase();
    return tags.filter((tag) => tag.name.toLowerCase().includes(lowerQuery));
  }, [tags, searchQuery]);

  return { searchQuery, setSearchQuery, filteredTags };
}
