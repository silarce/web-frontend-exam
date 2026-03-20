'use client';

import { ThemeProvider } from 'next-themes';

import('@/mocks/index');

export default function Providers({ children }: { children:React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={['light']}
    >
      {children}
    </ThemeProvider>
  );
}
