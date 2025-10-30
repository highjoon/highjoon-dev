'use client';

import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@highjoon-dev/ui/components/Command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@highjoon-dev/ui/components/Dialog';

type PostLite = { slug: string; title: string; description: string };

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  posts: PostLite[];
  onSelect: (slug: string) => void;
}

export default function SearchDialog({ open, onOpenChange, posts, onSelect }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>검색</DialogTitle>
          <DialogDescription>포스트를 검색하세요</DialogDescription>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="검색어를 입력해주세요..." className="pr-6" />
          <CommandList>
            <CommandEmpty>일치하는 게시물이 없습니다.</CommandEmpty>
            <CommandGroup heading="포스트">
              {posts.map((post) => (
                <CommandItem key={post.slug} value={post.title} onSelect={() => onSelect(post.slug)}>
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-muted-foreground">{post.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
