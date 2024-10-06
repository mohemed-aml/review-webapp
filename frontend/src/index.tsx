import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

// Make sure your global CSS is imported
import './index.css'; // or './App.css' depending on where your global styles are defined

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root with the container and render the app
if (container) {
  const root = createRoot(container); // createRoot instead of ReactDOM.render
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}