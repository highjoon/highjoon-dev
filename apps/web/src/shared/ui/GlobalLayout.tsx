import React, { PropsWithChildren } from 'react';

import Footer from '@/shared/ui/Footer';

import styles from './GlobalLayout.module.scss';

export default function GlobalLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <section className={styles.container}>{children}</section>
        <Footer />
      </main>
    </div>
  );
}
