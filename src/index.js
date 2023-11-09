import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider
import { ChakraProvider } from '@chakra-ui/react'

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider>
    <Router>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </Router>
    </ChakraProvider>  
);

