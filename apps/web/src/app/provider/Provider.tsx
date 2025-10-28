'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/vbscript-html';
import { OverlayProvider } from 'overlay-kit';
import { Toaster } from 'sonner';

import AppScripts from '@/app/scripts/AppScripts';

import '@mantine/core/styles.css';
import '@/app/styles/_components.scss';
import '@mantine/notifications/styles.css';
import 'highlight.js/styles/github-dark.css';
import '@/app/styles/globals.css';
import '@mantine/spotlight/styles.css';

const theme = createTheme({
  primaryColor: 'indigo',
  autoContrast: true,
});

export const Provider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('html', html);
    hljs.registerLanguage('plaintext', plaintext);
  }, []);

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications />
          <OverlayProvider>{children}</OverlayProvider>
        </MantineProvider>
        <Toaster />
      </ThemeProvider>

      <AppScripts />
    </>
  );
};
