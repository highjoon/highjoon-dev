import React from 'react';

import { getAllTagsApi } from '@/entities/tag/api/getAllTagsApi';
import { sortTagsByPopularity } from '@/entities/tag/lib/tag';
import TagList from '@/entities/tag/ui/TagList';
import { serverApi } from '@/shared/api/apiClient/serverApi';

export default async function TagsPage() {
  const tags = await getAllTagsApi(serverApi);
  const sortedTags = sortTagsByPopularity(tags);

  return (
    <section className="py-2 md:py-4 lg:py-8">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold md:text-4xl">Tags</h1>
          <p className="text-muted-foreground">총 {tags.length}개</p>
        </div>
        <TagList tags={sortedTags} />
      </div>
    </section>
  );
}
