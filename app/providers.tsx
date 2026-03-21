'use client';

import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MuiThemeProvider from './muiThemeProvider';

import('@/mocks/index');

export default function Providers({ children }: { children:React.ReactNode }) {
  // 為了避免在next伺服器不同使用者共用資料，寫在hook裡面，確保QueryClient實例只會在本地
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={['light']}
    >
      <MuiThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}
