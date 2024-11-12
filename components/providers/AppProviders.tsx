'use client';

import * as React from 'react';
import { ThemeProvider as ThemeProvider } from 'next-themes';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
