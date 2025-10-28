import React, { PropsWithChildren } from 'react';

import Footer from '@/widgets/ui/Footer';

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col w-full min-h-screen bg-background">
      <main className="relative flex flex-col items-center flex-1 pt-8 overflow-x-hidden overflow-y-auto">
        <section className="flex flex-col flex-1 w-full max-w-6xl px-4 space-y-6 md:px-6">{children}</section>
        <Footer />
      </main>
    </div>
  );
}
