import React from 'react';

import { MdxComponents } from '@/entities/post/lib/mdx/MdxComponents';
import MDXContent from '@/entities/post/lib/mdx/MDXContent';

interface Props {
  content: string;
}

export default function PostArticleContent({ content }: Props) {
  return (
    <div className="mb-20 prose prose-lg dark:prose-invert max-w-none">
      <div
        id="page-content"
        className="flex flex-col space-y-8 text-lg leading-relaxed text-vibrant-text-main dark:text-slate-300">
        <MDXContent source={content} components={MdxComponents} />
      </div>
    </div>
  );
}
