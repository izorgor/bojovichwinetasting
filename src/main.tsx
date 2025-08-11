import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { queryClient } from './app/queryClient';
import { theme } from './app/theme';
import WinesPage from './features/wines/pages/WinesPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WinesPage />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
