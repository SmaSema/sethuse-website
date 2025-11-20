//   Entry point of the React application.
//   Renders the root React component (<App />) into the DOM.
//   Imports global CSS, main App component, and performance reporting.


import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 root API
import './index.css';                    // Global styles
import App from './App';                 // Main application component
import reportWebVitals from './reportWebVitals'; // Performance monitoring

// Create the root element for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: log performance metrics (can send to analytics endpoint)
reportWebVitals();
