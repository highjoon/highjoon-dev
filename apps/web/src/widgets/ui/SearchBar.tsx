import { Button } from '@highjoon-dev/ui/components/Button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onClick: () => void;
}

export default function SearchBar({ onClick }: SearchBarProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex items-center h-auto px-4 py-2 space-x-3 transition-all border shadow-none group rounded-2xl border-slate-300 bg-slate-100 text-slate-400 hover:border-indigo-600 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400">
      <Search size={18} />
      <span className="pr-4 text-xs font-bold tracking-widest uppercase border-r border-slate-300 dark:border-slate-800">
        Search
      </span>
      <kbd className="text-[10px] font-black opacity-60">⌘K</kbd>
    </Button>
  );
}
