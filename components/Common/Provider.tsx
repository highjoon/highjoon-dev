'use client';

import { PropsWithChildren } from 'react';
import { createTheme, MantineProvider, Switch } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles/_components.scss';

const theme = createTheme({
  primaryColor: 'indigo',
  autoContrast: true,
});

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};

export default Provider;
