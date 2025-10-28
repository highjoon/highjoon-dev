'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@highjoon-dev/ui/components/Button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@highjoon-dev/ui/components/Command';
import { Search } from 'lucide-react';

import { useGetPosts } from '@/entities/post/api/getAllPostsApi/useGetPosts';
import { createPostPath } from '@/entities/post/lib/post';

type Props = { onClickPost?: () => void };

const SearchBar = ({ onClickPost = () => {} }: Props) => {
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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="검색어를 입력해주세요..." />
          <CommandList>
            <CommandEmpty>일치하는 게시물이 없습니다.</CommandEmpty>
            <CommandGroup heading="포스트">
              {posts.map((post) => (
                <CommandItem key={post.slug} value={post.title} onSelect={() => handleSelect(post.slug)}>
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-muted-foreground">{post.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
