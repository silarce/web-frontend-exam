import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import '../css/globals.css';
import clsx from 'clsx';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import MuiThemeProvider from './muiThemeProvider';

import Providers from './providers';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700'], // 選你需要的字重
  variable: '--font-noto-sans-tc',
});
export const metadata: Metadata = {
  title: '弈樂科技測驗',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-tw"
      data-theme="light"
      suppressHydrationWarning
    >
      <body className={clsx('bg-theme-bg-base antialiased', notoSansTC.className)}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider>
            <Providers>
              {children}
            </Providers>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
