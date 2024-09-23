import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme/theme.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import BreakpointsProvider from './providers/BreakpointsProvider.tsx';
import App from './App.tsx';
import Dashboard from 'pages/dashboard/Dashboard.tsx';
import MatchDetails from 'components/sections/dashboard/match-details/MatchDetails.tsx';
import './index.css';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/:matchId',
        element: <MatchDetails/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BreakpointsProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </BreakpointsProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
