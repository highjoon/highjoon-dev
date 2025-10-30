'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@highjoon-dev/ui/components/Button';
import { Search } from 'lucide-react';

import { useGetPosts } from '@/entities/post/api/getAllPostsApi/useGetPosts';
import { createPostPath } from '@/entities/post/lib/post';

const SearchDialog = dynamic(() => import('./SearchDialog'), { ssr: false });

interface Props {
  onClickPost?: () => void;
}

export default function SearchBar({ onClickPost = () => {} }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const posts = useGetPosts();

  const handleSelect = (postSlug: string) => {
    router.push(createPostPath(postSlug));
    setOpen(false);
    onClickPost();
  };

  return (
    <>
      <Button
        variant="outline"
        className="justify-start w-full lg:w-64 text-muted-foreground"
        onClick={() => setOpen(true)}>
        <Search className="w-4 h-4 mr-2" />
        검색
      </Button>
      {open && <SearchDialog open={open} onOpenChange={setOpen} posts={posts} onSelect={handleSelect} />}
    </>
  );
}
