import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './utils/color';
import { OverviewProvider } from './components/OverviewContext';

import App from './App';


const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <ChakraProvider theme={theme}>
    {/* Use ColorModeScript to set the initial color mode */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

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
