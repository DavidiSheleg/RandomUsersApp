import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { MainPage } from './pages/MainPage';
import { UserDialog } from './components/UserDialog/UserDialog';
import { DeleteDialog } from './components/DeleteDialog';

function App() {
  return (
    <ThemeProvider theme={theme}>
       <MainPage />
       <UserDialog />
       <DeleteDialog />
    </ThemeProvider>
  );
}

export default App;
