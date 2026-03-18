'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  // cssVariables: true, // 可以在css中引用mui的顏色，不需要
  typography: {
    fontFamily: 'var(--font-noto-sans-tc)',
  },
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
}
