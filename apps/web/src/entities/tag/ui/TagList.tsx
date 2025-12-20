import React from 'react';

import type { TagWithCount } from '@/entities/tag/api/getAllTagsApi/dto';
import EmptyTagState from '@/entities/tag/ui/EmptyTagState';
import TagCard from '@/entities/tag/ui/TagCard';

interface Props {
  tags: TagWithCount[];
}

export default function TagList({ tags }: Props) {
  if (!tags.length) {
    return <EmptyTagState />;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <TagCard tag={tag} />
        </li>
      ))}
    </ul>
  );
}
