'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TagSearchInput({ value, onChange, placeholder = 'Search topics...' }: Props) {
  return (
    <div className="relative max-w-sm mb-4">
      <Search className="absolute -translate-y-1/2 left-4 top-1/2 text-slate-400" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-3 pl-12 pr-4 text-sm font-bold transition-all bg-white border rounded-2xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder:text-slate-400 dark:text-white"
      />
    </div>
  );
}
