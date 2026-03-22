'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ThemeProvider as MuiThemeProvider, createTheme as createMuiTheme } from '@mui/material/styles';

const muiTheme = createMuiTheme({
  // cssVariables: true, // 可以在css中引用mui的顏色，不需要
  typography: {
    fontFamily: 'var(--font-noto-sans-tc)',
  },
});

// import('@/mocks/index'); // 舊的 MirageJS mock

export default function Providers({ children }: { children:React.ReactNode }) {
  // 為了避免在next伺服器不同使用者共用資料，寫在hook裡面，確保QueryClient實例只會在本地
  const [queryClient] = useState(() => new QueryClient());
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    import('@/mocks/browser').then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
      .then(() => setIsMswReady(true));
  }, []);

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={['light']}
    >
      <MuiThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          {isMswReady && children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}
