import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <Router>
    <React.StrictMode>
      <UserProvider> {/* Wrap your App with UserProvider */}
        <App />
      </UserProvider>
    </React.StrictMode>
  </Router>
);

