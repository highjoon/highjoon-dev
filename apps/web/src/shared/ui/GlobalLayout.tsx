import React, { PropsWithChildren } from 'react';

import Footer from '@/widgets/ui/Footer';
import Header from '@/widgets/ui/Header';

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-indigo-900 dark:selection:text-indigo-300">
      <Header />
      <main className="pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
