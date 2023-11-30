import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProviderzzz
import { ChakraProvider } from '@chakra-ui/react'
import theme from './utils/color';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider theme={theme}>
    <div id="otpless-login-page"></div>
    <script
      type="text/javascript"
      src="https://otpless.com/auth.js"
      cid="OZKDMIB9EXXJIOH8XBB89OMBI4SBNMMG"
    ></script>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ChakraProvider>
);

