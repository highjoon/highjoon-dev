'use client';

import { PropsWithChildren, useEffect } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/vbscript-html';
import '@mantine/core/styles.css';
import '@/styles/_components.scss';
import 'highlight.js/styles/github-dark.css';

const theme = createTheme({
  primaryColor: 'indigo',
  autoContrast: true,
});

const Provider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('html', html);
    hljs.registerLanguage('plaintext', plaintext);
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};

export default Provider;
