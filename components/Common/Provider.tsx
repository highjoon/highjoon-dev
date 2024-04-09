'use client';

import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </MantineProvider>
  );
};

export default Provider;
