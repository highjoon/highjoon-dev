import React from 'react';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="py-20 text-center border bg-slate-50 dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800">
      <p className="font-bold text-slate-500">{message}</p>
    </div>
  );
}
