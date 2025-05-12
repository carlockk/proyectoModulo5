import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <CarritoProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
