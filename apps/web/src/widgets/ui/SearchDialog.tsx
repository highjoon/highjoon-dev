'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@highjoon-dev/ui/components/Command';
import { Dialog, DialogContent, DialogTitle } from '@highjoon-dev/ui/components/Dialog';
import dayjs from 'dayjs';
import { ChevronRight, FileText } from 'lucide-react';

import { useGetPosts } from '@/entities/post/api/getAllPostsApi/useGetPosts';
import { createPostPath } from '@/entities/post/lib/post';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const posts = useGetPosts();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts.slice(0, 4);
    }

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) => post.title.toLowerCase().includes(query) || (post.category?.toLowerCase().includes(query) ?? false),
    );
  }, [searchQuery, posts]);

  const handlePostClick = useCallback(
    (postId: string) => {
      const post = posts.find((post) => post.id === postId);

      if (!post?.slug) return;

      router.push(createPostPath(post.slug));

      onClose();
    },
    [onClose, posts, router],
  );

  useEffect(() => {
    if (isOpen) return;

    setSearchQuery('');
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="top-[15vh] translate-y-0 w-full max-w-2xl overflow-hidden border shadow-2xl rounded-3xl border-slate-300 dark:border-slate-800 dark:bg-slate-900 p-0">
        <DialogTitle className="sr-only">포스트 검색</DialogTitle>
        <Command
          className="border-0 rounded-3xl"
          filter={(value, search) => {
            const post = posts.find((post) => post.id === value);
            if (!post) return 0;

            const searchLower = search.toLowerCase();
            if (post.title.toLowerCase().includes(searchLower)) return 1;
            if (post.category?.toLowerCase().includes(searchLower)) return 1;
            return 0;
          }}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-300 dark:border-slate-800">
            <CommandInput
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder="검색어를 입력해주세요"
              className="flex-1 w-full h-auto px-0 py-0 text-lg font-medium bg-transparent border-none text-slate-800 placeholder:text-slate-400 focus:ring-0 dark:text-slate-100"
            />
            <kbd className="hidden select-none items-center gap-1 rounded border border-slate-300 bg-slate-50 px-1.5 font-sans text-[10px] font-black uppercase text-slate-500 opacity-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 sm:inline-flex">
              ESC
            </kbd>
          </div>

          <CommandList className="custom-scrollbar max-h-[60vh] overflow-y-auto p-4">
            <CommandEmpty>
              <div className="px-3 py-8 text-center text-slate-500 dark:text-slate-400">검색 결과가 없습니다.</div>
            </CommandEmpty>

            <CommandGroup
              heading={
                <h4 className="mb-3 px-3 text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                  {searchQuery.trim() ? `검색 결과 (${filteredPosts.length})` : '최신 포스트'}
                </h4>
              }>
              <div className="space-y-1">
                {filteredPosts.map((post) => (
                  <CommandItem
                    key={post.id}
                    value={post.id}
                    onSelect={() => handlePostClick(post.id)}
                    className="flex items-center w-full p-3 text-left transition-colors border rounded-2xl group data-[selected=true]:border-indigo-600 data-[selected=true]:bg-indigo-50 dark:data-[selected=true]:border-indigo-500 dark:data-[selected=true]:bg-indigo-950/30 data-[selected=false]:border-transparent data-[selected=false]:hover:border-slate-200 data-[selected=false]:hover:bg-slate-50 dark:data-[selected=false]:hover:border-slate-700 dark:data-[selected=false]:hover:bg-slate-800/50">
                    <div className="flex items-center justify-center w-10 h-10 mr-4 transition-colors border rounded-xl border-slate-200 bg-slate-100 group-hover:border-indigo-200 group-hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:group-hover:bg-slate-700">
                      <FileText size={20} className="text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold truncate transition-colors text-slate-900 group-hover:text-indigo-600 dark:text-slate-100">
                        {post.title}
                      </p>
                      <p className="text-xs truncate text-slate-500 dark:text-slate-400">
                        {post.category} · {dayjs(post.publishedAt).format('YYYY-MM-DD')}
                      </p>
                    </div>
                    <ChevronRight size={16} className="ml-2 text-slate-300 group-hover:text-indigo-600" />
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between border-t border-slate-300 bg-slate-50 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border rounded border-slate-300 dark:border-slate-800 dark:bg-slate-900">
                  ↑↓
                </kbd>
                이동
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border rounded border-slate-300 dark:border-slate-800 dark:bg-slate-900">
                  Enter
                </kbd>
                선택
              </span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
